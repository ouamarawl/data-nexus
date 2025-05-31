// src/utils/helpers.js

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const hashPassword = (password) => {
  // Implement password hashing logic here
  return password; // Placeholder, replace with actual hashing
};

const formatResponse = (status, message, data = null) => {
  return {
    status,
    message,
    data,
  };
};

module.exports = {
  validateEmail,
  hashPassword,
  formatResponse,
};