import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { getAllTasks, createTask, updateTask, deleteTask, toggleTaskComplete } from '../services/tasks';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks from the API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task to the list
  const addTodo = async (todo) => {
    try {
      const newTodo = await createTask(todo);
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error(err);
    }
  };

  // Toggle completed status of a task
  const toggleComplete = async (id) => {
    try {
      const updatedTodo = await toggleTaskComplete(id);
      setTodos(
        todos.map(todo =>
          todo._id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error(err);
    }
  };

  // Delete a task
  const deleteTodo = async (id) => {
    try {
      await deleteTask(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  // Edit a task
  const editTodo = (id) => {
    setEditingId(id);
  };

  // Update a task
  const updateTodo = async (updatedTodo) => {
    try {
      const result = await updateTask(updatedTodo._id, updatedTodo);
      setTodos(
        todos.map(todo =>
          todo._id === updatedTodo._id ? result : todo
        )
      );
      setEditingId(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error(err);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
  };

  if (loading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <TodoForm addTodo={addTodo} />
      
      <div className="mt-6 space-y-4">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              updateTodo={updateTodo}
              cancelEdit={cancelEdit}
              isEditing={editingId === todo._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList; 