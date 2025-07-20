// server/config/db.js

// Import mongoose, the library that will help us communicate with our MongoDB database.
const mongoose = require('mongoose');

// This is an asynchronous function to connect to the database.
// We use async/await syntax for cleaner handling of promises.
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster.
    // mongoose.connect() returns a promise, so we await its completion.
    // process.env.MONGO_URI is an environment variable where we'll store our connection string.
    // This keeps our sensitive credentials out of the source code.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These are options to prevent deprecation warnings from MongoDB driver.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // If the connection is successful, log a confirmation message to the console.
    // We include the host of the connected database for verification.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during connection, log the error message.
    console.error(`Error: ${error.message}`);
    
    // Exit the Node.js process with a failure code (1) if we can't connect to the database.
    // This is important because our application is useless without a database connection.
    process.exit(1);
  }
};

// Export the connectDB function so we can use it in other parts of our application (like server.js).
module.exports = connectDB;
