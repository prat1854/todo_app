import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Auth from './components/Auth';
import { isAuthenticated, logoutUser, getCurrentUser } from './services/auth';
import './index.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus);
      
      if (authStatus) {
        setCurrentUser(getCurrentUser());
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleAuthSuccess = (response) => {
    setAuthenticated(true);
    setCurrentUser(response.user);
  };

  const handleLogout = () => {
    logoutUser();
    setAuthenticated(false);
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Task Manager</h1>
              {authenticated && (
                <div className="flex items-center">
                  <span className="mr-4 text-sm text-gray-600">
                    Hi, {currentUser?.name || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            {authenticated ? <TodoList /> : <Auth onAuthSuccess={handleAuthSuccess} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 