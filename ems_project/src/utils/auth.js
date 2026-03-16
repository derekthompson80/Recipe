// Helper to interact with localStorage
const getFromStorage = (key) => {
  const saved = localStorage.getItem(key);
  try {
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- User Management ---

// 1. Function to create a login user name and password
export const createUser = (username, password) => {
  const users = getFromStorage('users') || [];
  
  // Check if username already exists
  if (users.some(u => u.username === username)) {
    return { success: false, message: 'User already exists' };
  }

  const newUser = { username, password }; // Note: In production, hash passwords!
  const updatedUsers = [...users, newUser];
  saveToStorage('users', updatedUsers);
  return { success: true, message: 'User created successfully' };
};

// 2. Function to store login user information
export const storeUserSession = (user) => {
  // Stores the currently logged-in user data (simple version)
  saveToStorage('currentUser', user);
  sessionStorage.setItem('isLoggedIn', 'true');
};

export const clearUserSession = () => {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('isLoggedIn');
};

// --- Login Tracking ---

// 3. Function to track failed and successful login attempts
export const trackLoginAttempt = (username, success) => {
  const attempts = getFromStorage('loginAttempts') || [];
  const newAttempt = {
    username,
    success,
    timestamp: new Date().toISOString()
  };
  const updatedAttempts = [...attempts, newAttempt];
  saveToStorage('loginAttempts', updatedAttempts);
};

export const getLoginAttempts = () => {
  return getFromStorage('loginAttempts') || [];
};

// --- Verification logic ---

export const verifyLogin = (username, password) => {
  const users = getFromStorage('users') || [];
  
  // Check for admin user (Master Login)
  const isAdmin = username === 'admin' && password === 'password';

  const user = users.find(u => u.username === username && u.password === password);
  
  if (user || isAdmin) {
    const finalUser = user ? user : { username: 'admin' };
    trackLoginAttempt(username, true);
    return { success: true, user: finalUser };
  } else {
    trackLoginAttempt(username, false);
    return { success: false, message: 'Invalid username or password' };
  }
};
