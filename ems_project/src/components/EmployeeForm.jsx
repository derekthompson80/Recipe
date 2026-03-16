import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm({ onSubmit, employees }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    department: ''
  });

  useEffect(() => {
    if (id && employees) {
      const existingEmployee = employees.find(emp => emp.id === parseInt(id));
      if (existingEmployee) {
        setEmployee(existingEmployee);
      }
    }
  }, [id, employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
    navigate('/');
  };

  return (
    <div className="employee-form">
      <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          {id ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
