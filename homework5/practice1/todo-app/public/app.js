// Global variables
let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;

// DOM elements
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const emptyState = document.getElementById('emptyState');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');
const filterButtons = document.querySelectorAll('.filter-btn');
const editModal = document.getElementById('editModal');
const closeModal = document.getElementById('closeModal');
const cancelEdit = document.getElementById('cancelEdit');
const saveEdit = document.getElementById('saveEdit');
const editTaskTitle = document.getElementById('editTaskTitle');
const editTaskDescription = document.getElementById('editTaskDescription');
const loadingSpinner = document.getElementById('loadingSpinner');
const messageContainer = document.getElementById('messageContainer');

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
});

// Initialize app
async function initApp() {
    await loadTasks();
    updateStats();
    renderTasks();
}

// Setup event listeners
function setupEventListeners() {
    // Add task
    addTaskBtn.addEventListener('click', addTask);
    taskTitle.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });

    // Modal events
    closeModal.addEventListener('click', closeEditModal);
    cancelEdit.addEventListener('click', closeEditModal);
    saveEdit.addEventListener('click', saveTaskEdit);

    // Close modal when clicking outside
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && editModal.style.display !== 'none') {
            closeEditModal();
        }
    });
}

// Show loading animation
function showLoading() {
    loadingSpinner.style.display = 'flex';
}

// Hide loading animation
function hideLoading() {
    loadingSpinner.style.display = 'none';
}

// Show message
function showMessage(message, type = 'info') {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;

    messageContainer.appendChild(messageElement);

    // Auto remove message after 3 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageContainer.removeChild(messageElement);
        }
    }, 3000);
}

// API 调用函数
async function apiCall(url, options = {}) {
    try {
        showLoading();
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API call error:', error);
        showMessage(error.message || 'Network request failed', 'error');
        throw error;
    } finally {
        hideLoading();
    }
}

// Load all tasks
async function loadTasks() {
    try {
        tasks = await apiCall('/tasks');
    } catch (error) {
        tasks = [];
    }
}

// Add new task
async function addTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (!title) {
        showMessage('Please enter task title', 'warning');
        taskTitle.focus();
        return;
    }

    try {
        const newTask = await apiCall('/tasks', {
            method: 'POST',
            body: JSON.stringify({ title, description })
        });

        tasks.unshift(newTask);
        taskTitle.value = '';
        taskDescription.value = '';

        updateStats();
        renderTasks();
        showMessage('Task added successfully', 'success');

        taskTitle.focus();
    } catch (error) {
        // Error already handled in apiCall
    }
}

// Toggle task completion status
async function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
        const updatedTask = await apiCall(`/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: !task.completed })
        });

        const taskIndex = tasks.findIndex(t => t.id === taskId);
        tasks[taskIndex] = updatedTask;

        updateStats();
        renderTasks();

        const status = updatedTask.completed ? 'completed' : 'pending';
        showMessage(`Task marked as ${status}`, 'success');
    } catch (error) {
        // Error already handled in apiCall
    }
}

// Delete task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        await apiCall(`/tasks/${taskId}`, {
            method: 'DELETE'
        });

        tasks = tasks.filter(t => t.id !== taskId);

        updateStats();
        renderTasks();
        showMessage('Task deleted successfully', 'success');
    } catch (error) {
        // Error already handled in apiCall
    }
}

// Open edit modal
function openEditModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    editingTaskId = taskId;
    editTaskTitle.value = task.title;
    editTaskDescription.value = task.description || '';
    editModal.style.display = 'flex';
    editTaskTitle.focus();
}

// Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    editingTaskId = null;
    editTaskTitle.value = '';
    editTaskDescription.value = '';
}

// Save task edit
async function saveTaskEdit() {
    const title = editTaskTitle.value.trim();
    const description = editTaskDescription.value.trim();

    if (!title) {
        showMessage('Please enter task title', 'warning');
        editTaskTitle.focus();
        return;
    }

    if (!editingTaskId) return;

    try {
        const updatedTask = await apiCall(`/tasks/${editingTaskId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description })
        });

        const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
        tasks[taskIndex] = updatedTask;

        closeEditModal();
        renderTasks();
        showMessage('Task updated successfully', 'success');
    } catch (error) {
        // Error already handled in apiCall
    }
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;

    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    renderTasks();
}

// Get filtered tasks
function getFilteredTasks() {
    switch (currentFilter) {
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'pending':
            return tasks.filter(task => !task.completed);
        default:
            return tasks;
    }
}

// Update statistics
function updateStats() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
    pendingTasks.textContent = tasks.filter(task => !task.completed).length;
}

// Render task list
function renderTasks() {
    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        tasksList.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    tasksList.style.display = 'block';
    emptyState.style.display = 'none';

    tasksList.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');

    // Bind event listeners
    bindTaskEvents();
}

// Create task HTML
function createTaskHTML(task) {
    const createdDate = new Date(task.created_at).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <div class="task-header">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <div class="task-title">${escapeHtml(task.title)}</div>
                    ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
                </div>
            </div>
            <div class="task-meta">
                <span class="task-date">Created: ${createdDate}</span>
                <div class="task-actions">
                    <button class="edit-btn" onclick="openEditModal(${task.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        </div>
    `;
}

// Bind task events
function bindTaskEvents() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskId = parseInt(e.target.closest('.task-item').dataset.taskId);
            toggleTaskCompletion(taskId);
        });
    });
}

// HTML escape function to prevent XSS attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions available in global scope
window.toggleTaskCompletion = toggleTaskCompletion;
window.deleteTask = deleteTask;
window.openEditModal = openEditModal;