import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const initialState = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  };
  
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    addTodo(formData);
    setFormData(initialState);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
              ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Task title"
          />
        </label>
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Task description (optional)"
          />
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Due Date
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
              ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
          />
        </label>
        {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm; 