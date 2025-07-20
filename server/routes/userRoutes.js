// server/routes/userRoutes.js

const express = require('express');
const router = express.Router();
// Import both controller functions
const { registerUser, loginUser } = require('../controllers/userController');

console.log('userRoutes.js file has been loaded');

// Route for registering a user
// This connects the POST request at /api/users/ to the registerUser function
router.post('/', registerUser);

// Route for logging in a user
// This connects the POST request at /api/users/login to the loginUser function
router.post('/login', loginUser);

module.exports = router;
