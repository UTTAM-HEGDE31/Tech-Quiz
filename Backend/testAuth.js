const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/auth';

// Test User Registration
async function registerUser() {
  try {
    const res = await axios.post(`${BASE_URL}/register`, {
      name: 'Z',
      email: 'z@example.com',
      password: '123456'
    });
    console.log('✅ Registration successful:', res.data);
  } catch (err) {
    console.error('❌ Registration error:', err.response?.data || err.message);
  }
}

// Test User Login
async function loginUser() {
  try {
    const res = await axios.post(`${BASE_URL}/login`, {
      email: 'z@example.com',
      password: '123456'
    });
    console.log('✅ Login successful:', res.data);
  } catch (err) {
    console.error('❌ Login error:', err.response?.data || err.message);
  }
}

// Run both functions
(async () => {
  await registerUser();
  await loginUser();
})();
