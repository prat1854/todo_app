const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET all tasks
router.get('/', taskController.getAllTasks);

// GET a specific task by ID
router.get('/:id', taskController.getTaskById);

// CREATE a new task
router.post('/', taskController.createTask);

// UPDATE a task
router.put('/:id', taskController.updateTask);

// DELETE a task
router.delete('/:id', taskController.deleteTask);

module.exports = router; 