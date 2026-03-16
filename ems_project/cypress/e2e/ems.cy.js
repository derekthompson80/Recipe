describe('Employee Management System', () => {
  beforeEach(() => {
    // Clear localStorage and sessionStorage to start fresh
    cy.window().then((win) => {
      win.localStorage.clear();
      win.sessionStorage.clear();
    });
    cy.visit('/');
    cy.get('#username').type('admin');
    cy.get('#password').type('password');
    cy.get('button[type="submit"]').click();
  });

  it('should display the employee list', () => {
    cy.get('h2').should('contain', 'Employees');
    cy.get('table tbody tr').should('have.length', 4);
  });

  it('should add a new employee', () => {
    cy.get('nav').contains('Add Employee').click();
    cy.get('input[name="name"]').type('Alice Brown');
    cy.get('input[name="email"]').type('alice@example.com');
    cy.get('input[name="position"]').type('Accountant');
    cy.get('input[name="department"]').type('Finance');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('table tbody tr').should('have.length', 5);
    cy.get('table tbody').should('contain', 'Alice Brown');
  });

  it('should edit an existing employee', () => {
    cy.get('table tbody tr').first().find('.btn-edit').click();
    cy.get('input[name="name"]').clear().type('John Updated');
    cy.get('button[type="submit"]').click();

    cy.get('table tbody tr').first().should('contain', 'John Updated');
  });

  it('should delete an employee', () => {
    cy.get('table tbody tr').should('have.length', 4);
    cy.get('table tbody tr').first().find('.btn-delete').click();
    cy.get('table tbody tr').should('have.length', 3);
  });

  it('should logout successfully', () => {
    cy.get('.logout-button').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('h2').should('contain', 'Login');
  });

  it('should track login attempts in localStorage', () => {
    cy.get('.logout-button').click();
    
    // Fail login
    cy.get('#username').type('wronguser');
    cy.get('#password').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('be.visible');

    // Success login
    cy.get('#username').clear().type('admin');
    cy.get('#password').clear().type('password');
    cy.get('button[type="submit"]').click();

    cy.window().then((win) => {
      const attempts = JSON.parse(win.localStorage.getItem('loginAttempts'));
      expect(attempts).to.have.length.at.least(3); // 1 from beforeEach, 1 failed, 1 successful
      expect(attempts.find(a => a.username === 'wronguser' && !a.success)).to.exist;
      expect(attempts.find(a => a.username === 'admin' && a.success)).to.exist;
    });
  });

  it('should display login attempts in the UI', () => {
    // Already logged in from beforeEach
    cy.get('nav').contains('Security').click();
    cy.get('h2').should('contain', 'Security Dashboard');
    cy.get('h3').should('contain', 'Registered Login Information');
    cy.get('table tbody').should('contain', 'admin');
    cy.get('table tbody').should('contain', 'Success');
  });

  it('should allow creating a new login and logging in with it', () => {
    cy.get('.logout-button').click();
    
    // Switch to Create Login mode
    cy.get('.btn-link').contains('Create Login').click();
    cy.get('h2').should('contain', 'Create Login');

    // Create a new user
    cy.get('#username').type('newuser');
    cy.get('#password').type('newpassword');
    cy.get('#confirmPassword').type('newpassword');
    cy.get('button[type="submit"]').click();

    // Should be redirected to Login mode with success message
    cy.get('.success-message').should('contain', 'Account created successfully');
    cy.get('h2').should('contain', 'Login');

    // Login with new user
    cy.get('#username').clear().type('newuser');
    cy.get('#password').clear().type('newpassword');
    cy.get('button[type="submit"]').click();

    // Verify successful login
    cy.get('h2').should('contain', 'Employees');
    cy.get('nav').should('contain', 'Logout');
  });

  it('should display the currently logged-in username', () => {
    // Check for admin user (logged in by beforeEach)
    cy.get('.user-info-nav').should('contain', 'Logged in as: admin');

    // Logout and login with another user to verify dynamic update
    cy.get('.logout-button').click();
    
    // Switch to Create Login mode
    cy.get('.btn-link').contains('Create Login').click();
    cy.get('#username').type('testuser');
    cy.get('#password').type('password123');
    cy.get('#confirmPassword').type('password123');
    cy.get('button[type="submit"]').click();

    // Login with testuser
    cy.get('#username').clear().type('testuser');
    cy.get('#password').clear().type('password123');
    cy.get('button[type="submit"]').click();

    // Verify username display
    cy.get('.user-info-nav').should('contain', 'Logged in as: testuser');
  });

  it('should filter employees by search term', () => {
    cy.get('.search-input').type('John Doe');
    cy.get('table tbody tr').should('have.length', 1);
    cy.get('table tbody tr').should('contain', 'John Doe');

    cy.get('.search-input').clear().type('Jane');
    cy.get('table tbody tr').should('have.length', 1);
    cy.get('table tbody tr').should('contain', 'Jane Smith');

    cy.get('.search-input').clear().type('NonExistent');
    cy.get('.no-results').should('be.visible').and('contain', 'No employees found');
  });

  it('should only show Security to admin user', () => {
    // Admin user (from beforeEach) should see it
    cy.get('nav ul').should('contain', 'Security');

    // Logout and login as non-admin
    cy.get('.logout-button').click();
    
    // Create and login as non-admin
    cy.get('.btn-link').contains('Create Login').click();
    cy.get('#username').type('regularuser');
    cy.get('#password').type('password');
    cy.get('#confirmPassword').type('password');
    cy.get('button[type="submit"]').click();
    
    cy.get('#username').clear().type('regularuser');
    cy.get('#password').clear().type('password');
    cy.get('button[type="submit"]').click();

    // Wait for the main page to load
    cy.get('h2').should('contain', 'Employees');

    // Regular user should NOT see it
    cy.get('nav ul').should('not.contain', 'Security');
    
    // Direct access should redirect
    cy.visit('/security');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
