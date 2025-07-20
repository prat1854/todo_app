import api from './api';

export const getAllTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch tasks');
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch task');
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to create task');
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to update task');
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to delete task');
  }
};

export const toggleTaskComplete = async (taskId) => {
  try {
    const response = await api.patch(`/tasks/${taskId}/toggle`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to toggle task status');
  }
}; 