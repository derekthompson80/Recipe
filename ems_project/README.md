# Employee Management System (EMS)

This project is a React-based Employee Management System that allows HR and admin users to manage employee records efficiently. It replaces manual spreadsheets with a dynamic web interface, minimizing data duplication and improving accuracy.

## Features

- **Employee List View**: Display all employees with their details (Name, Email, Position, Department).
- **Add Employee**: Create new employee records through a user-friendly form.
- **Edit Employee**: Update existing employee information.
- **Delete Employee**: Remove employee records from the system.
- **Persistence**: Uses browser `localStorage` to keep data between sessions.
- **Automated Testing**: Comprehensive E2E tests using Cypress.

## How the Code Works

The application is built using **React** and **Vite**.

- **App.jsx**: The main entry point that manages the global state of employees and handles routing using `react-router-dom`.
- **EmployeeList.jsx**: Renders a table of employees and provides links/buttons for editing and deleting.
- **EmployeeForm.jsx**: A reusable component used for both adding and editing employees. It populates data from the URL params when in "edit" mode.
- **localStorage**: The application synchronizes its state with the browser's local storage, ensuring that your changes are saved even after refreshing the page.
- **CSS**: Custom styling in `App.css` provides a clean and professional look.

## Technologies Used

- **Frontend**: React 19, Vite
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect)
- **Testing**: Cypress
- **Storage**: LocalStorage API

## Steps for Using the Website

### Prerequisites
- Node.js installed on your machine.
- A modern web browser.

### Installation & Setup

1. **Clone the repository** (or navigate to the project folder).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the application**:
   ```bash
   npm run dev
   ```
4. **Access the website**:
   Open your browser and go to `http://localhost:5173`.

### Navigating the System

- **Viewing Employees**: Upon landing on the homepage, you will see a list of initial employees.
- **Adding an Employee**:
  1. Click on "Add Employee" in the navigation bar.
  2. Fill out the form with Name, Email, Position, and Department.
  3. Click "Add Employee" to save. You will be redirected back to the list.
- **Editing an Employee**:
  1. Click the "Edit" button next to an employee in the list.
  2. Update the information in the form.
  3. Click "Update Employee" to save changes.
- **Deleting an Employee**:
  1. Click the "Delete" button next to an employee.
  2. The record will be removed immediately from the list.

### Running Tests

To run the automated Cypress tests:

1. Ensure the application is running (`npm run dev`).
2. Open Cypress:
   ```bash
   npx cypress open
   ```
3. Choose "E2E Testing" and select "ems.cy.js" to run the tests.
   *Alternatively, run in headless mode:*
   ```bash
   npx cypress run
   ```
