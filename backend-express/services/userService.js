// userService Business Logic:
// - password length / security
// - allow the usage of their private info
// - whether 16 or above in age via checkbox or dob

const userData = require('../data/userData');
const bcrypt = require('bcrypt');

async function getAllUsers() {
  // idea for future business logic:
  // 1. may have to pass parameter to getAllProducts to filter by country
  // 2. may have to pass parameter to getAllProducts to get stuff the user will likely to buy
  let user = await userData.getAllUsers();
  // console.log(user);

  // return await userData.getAllUsers();
  return user;
}

async function registerUser({ name, email, password, salutation, marketingPreferences, country }) {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  
  const existingUser = await userData.getUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userData.createUser({
    name,
    email,
    password: hashedPassword,
    salutation,
    marketingPreferences,
    country
  });
}

async function loginUser(email, password) {
  const user = await userData.getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  return user;
}

module.exports = {
  getAllUsers,
  registerUser,
  loginUser
};
