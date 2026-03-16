import React, { useState, useEffect } from 'react';
import LoginAttempts from './LoginAttempts';

function Security() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load registered users from localStorage
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  return (
    <div className="security-dashboard">
      <div className="security-header">
        <h2>Security Dashboard</h2>
      </div>
      
      <div className="registered-users-section">
        <h3>Registered Login Information</h3>
        {users.length === 0 ? (
          <p>No non-admin users registered yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>User</td>
                </tr>
              ))}
              <tr>
                <td>admin</td>
                <td>Master Admin</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <hr className="security-divider" />

      <div className="login-attempts-section">
        <LoginAttempts />
      </div>
    </div>
  );
}

export default Security;
