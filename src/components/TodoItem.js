import React, { useState } from 'react';

const TodoItem = ({ 
  todo, 
  toggleComplete, 
  deleteTodo, 
  editTodo, 
  updateTodo, 
  cancelEdit, 
  isEditing 
}) => {
  const [editFormData, setEditFormData] = useState({ ...todo });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTodo(editFormData);
  };

  // Priority color styling
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  // Format date to local string
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Check if task is overdue
  const isOverdue = () => {
    if (!todo.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(todo.dueDate);
    return dueDate < today && !todo.completed;
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
        <form onSubmit={handleEditSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                rows="2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
              <input
                type="date"
                name="dueDate"
                value={editFormData.dueDate}
                onChange={handleEditChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
              <select
                name="priority"
                value={editFormData.priority}
                onChange={handleEditChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow p-4 border ${todo.completed ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div>
            <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {todo.dueDate && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  ${isOverdue() ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                  Due: {formatDate(todo.dueDate)}
                  {isOverdue() && ' (Overdue)'}
                </span>
              )}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => editTodo(todo.id)}
            className="text-sm text-blue-600 hover:text-blue-800"
            disabled={todo.completed}
          >
            Edit
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 