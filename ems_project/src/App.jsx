import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Login from './components/Login';
import Security from './components/Security';
import { initialEmployees } from './data/employees';
import { clearUserSession } from './utils/auth';
import './App.css';

function App() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    clearUserSession();
  };

  const addEmployee = (employee) => {
    const newEmployee = { ...employee, id: Date.now() };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <header>
          <div className="header-top">
            <h1>EMS - Employee Management System</h1>
          </div>
          {isLoggedIn && (
            <nav>
              <ul>
                <li><Link to="/">Employee List</Link></li>
                <li><Link to="/add">Add Employee</Link></li>
                {currentUser?.username === 'admin' && (
                  <li><Link to="/security">Security</Link></li>
                )}
                {currentUser && (
                  <li className="user-info-nav">
                    <span>Logged in as: <strong>{currentUser.username}</strong></span>
                  </li>
                )}
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
              </ul>
            </nav>
          )}
        </header>

        <main>
          <Routes>
            <Route path="/" element={isLoggedIn ? <EmployeeList employees={employees} deleteEmployee={deleteEmployee} /> : <Login onLogin={handleLogin} />} />
            <Route path="/add" element={isLoggedIn ? <EmployeeForm onSubmit={addEmployee} /> : <Navigate to="/" />} />
            <Route path="/edit/:id" element={isLoggedIn ? <EmployeeForm onSubmit={updateEmployee} employees={employees} /> : <Navigate to="/" />} />
            <Route path="/security" element={isLoggedIn && currentUser?.username === 'admin' ? <Security /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
