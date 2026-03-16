import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyLogin, storeUserSession, createUser } from '../utils/auth';

function Login({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setMessage('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (isLoginMode) {
      const result = verifyLogin(username, password);
      
      if (result.success) {
        storeUserSession(result.user);
        onLogin(result.user);
        navigate('/');
      } else {
        setError(result.message);
      }
    } else {
      // Create User mode
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (username.toLowerCase() === 'admin') {
        setError('Cannot create user with name "admin"');
        return;
      }

      const result = createUser(username, password);
      if (result.success) {
        setMessage('Account created successfully! You can now log in.');
        setIsLoginMode(true);
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isLoginMode ? 'Login' : 'Create Login'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
          <button type="submit">{isLoginMode ? 'Login' : 'Create Account'}</button>
        </form>
        <div className="toggle-login">
          <p>
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              onClick={handleToggleMode}
              className="btn-link"
            >
              {isLoginMode ? 'Create Login' : 'Back to Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
