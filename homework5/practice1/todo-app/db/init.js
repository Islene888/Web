const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, '..', 'database.db');

// Initialize database
function initDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Failed to connect to database:', err.message);
                reject(err);
                return;
            }
            console.log('Successfully connected to SQLite database');
        });

        // Create tasks table
        const createTableSQL = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                completed INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;

        db.run(createTableSQL, (err) => {
            if (err) {
                console.error('Failed to create table:', err.message);
                reject(err);
                return;
            }
            console.log('Data table initialization completed');

            db.close((err) => {
                if (err) {
                    console.error('Failed to close database connection:', err.message);
                    reject(err);
                    return;
                }
                console.log('Database connection closed');
                resolve();
            });
        });
    });
}

// Get database connection
function getDatabase() {
    return new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('连接数据库失败:', err.message);
        }
    });
}

module.exports = {
    initDatabase,
    getDatabase
};