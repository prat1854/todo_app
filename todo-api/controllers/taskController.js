const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date, priority, completed } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTask = await Task.create({
      title,
      description: description || '',
      due_date: due_date || null,
      priority: priority || 'medium',
      completed: completed || false
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, due_date, priority, completed } = req.body;
    
    // Check if task exists
    const existingTask = await Task.getById(taskId);
    if (!existingTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Update task
    const updatedTask = await Task.update(taskId, {
      title: title || existingTask.title,
      description: description !== undefined ? description : existingTask.description,
      due_date: due_date !== undefined ? due_date : existingTask.due_date,
      priority: priority || existingTask.priority,
      completed: completed !== undefined ? completed : existingTask.completed
    });
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    
    const deleted = await Task.delete(taskId);
    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 