// src/utils/helpers.js

const bcrypt = require('bcrypt');

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
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