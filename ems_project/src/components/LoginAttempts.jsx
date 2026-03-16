import React, { useState, useEffect } from 'react';
import { getLoginAttempts } from '../utils/auth';

function LoginAttempts() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    // Load attempts from storage
    const savedAttempts = getLoginAttempts();
    setAttempts(savedAttempts);
  }, []);

  return (
    <div className="login-attempts-container">
      <h2>Login Attempts</h2>
      {attempts.length === 0 ? (
        <p>No login attempts recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt, index) => (
              <tr key={index}>
                <td>{attempt.username}</td>
                <td>
                  <span className={attempt.success ? 'status-success' : 'status-failed'}>
                    {attempt.success ? 'Success' : 'Failed'}
                  </span>
                </td>
                <td>{new Date(attempt.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LoginAttempts;
