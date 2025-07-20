import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSuccess = (response) => {
    if (onAuthSuccess) {
      onAuthSuccess(response);
    }
  };

  const handleRegisterSuccess = () => {
    // After registration, switch to login
    setIsLogin(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div className="w-full mb-6">
        <div className="flex justify-center">
          <button
            className={`py-2 px-4 w-1/2 border-b-2 focus:outline-none ${
              isLogin
                ? 'border-blue-500 text-blue-500 font-bold'
                : 'border-gray-200 text-gray-500'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 w-1/2 border-b-2 focus:outline-none ${
              !isLogin
                ? 'border-blue-500 text-blue-500 font-bold'
                : 'border-gray-200 text-gray-500'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
      </div>

      {isLogin ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Register onRegisterSuccess={handleRegisterSuccess} />
      )}
    </div>
  );
};

export default Auth; 