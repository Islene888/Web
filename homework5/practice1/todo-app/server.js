const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase, getDatabase } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize database
async function startServer() {
    try {
        await initDatabase();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

// API routes

// Get all tasks
app.get('/tasks', (req, res) => {
    const db = getDatabase();

    db.all('SELECT * FROM tasks ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Failed to get tasks' });
            return;
        }
        res.json(rows);
    });

    db.close();
});

// Add new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Task title cannot be empty' });
    }

    const db = getDatabase();

    db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description || ''],
        function(err) {
            if (err) {
                res.status(500).json({ error: 'Failed to add task' });
                return;
            }

            // Return the newly created task
            db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
                db.close();
                if (err) {
                    res.status(500).json({ error: 'Failed to get new task' });
                    return;
                }
                res.status(201).json(row);
            });
        }
    );
});

// Update task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const db = getDatabase();

    // Build dynamic SQL update statement
    let updateFields = [];
    let values = [];

    if (title !== undefined) {
        updateFields.push('title = ?');
        values.push(title);
    }

    if (description !== undefined) {
        updateFields.push('description = ?');
        values.push(description);
    }

    if (completed !== undefined) {
        updateFields.push('completed = ?');
        values.push(completed ? 1 : 0);
    }

    if (updateFields.length === 0) {
        db.close();
        return res.status(400).json({ error: 'No fields provided for update' });
    }

    values.push(id);
    const sql = `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`;

    db.run(sql, values, function(err) {
        if (err) {
            db.close();
            res.status(500).json({ error: 'Failed to update task' });
            return;
        }

        if (this.changes === 0) {
            db.close();
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        // Return the updated task
        db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
            db.close();
            if (err) {
                res.status(500).json({ error: 'Failed to get updated task' });
                return;
            }
            res.json(row);
        });
    });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const db = getDatabase();

    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
        db.close();
        if (err) {
            res.status(500).json({ error: 'Failed to delete task' });
            return;
        }

        if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        res.json({ message: 'Task deleted successfully' });
    });
});

// Start server
startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});