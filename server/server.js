// server/server.js
console.log('--- Reading server.js file (v3) ---'); // A log to confirm this file is running

// --- 1. Imports ---
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes'); // Import note routes

// --- 2. Initializations ---
dotenv.config();
const app = express();

// --- 3. Middleware ---
app.use(express.json());

// --- 4. Routes ---
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

console.log('--- Applying /api/users routes ---');
app.use('/api/users', userRoutes);

// --- DEBUGGING LOG ---
console.log('--- Applying /api/notes routes ---');
app.use('/api/notes', noteRoutes);


// --- 5. Server Startup Function ---
const startServer = async () => {
  try {
    console.log('--- Attempting to connect to MongoDB... ---');
    await connectDB(); // Wait for the database connection to succeed

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`--- Server successfully started on port ${PORT} ---`);
    });

  } catch (error) {
    console.error('!!! FAILED TO START SERVER !!!', error);
    process.exit(1);
  }
};

// --- 6. Start the Server ---
startServer();
