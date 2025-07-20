// server/models/User.js

const mongoose = require('mongoose');

// A Mongoose schema defines the structure of the document, default values, validators, etc.
const userSchema = mongoose.Schema(
  {
    // Define a 'name' field for the user.
    name: {
      type: String,
      required: true, // This field must be provided.
    },
    // Define an 'email' field.
    email: {
      type: String,
      required: true, // This field is required.
      unique: true,   // No two users can have the same email address.
    },
    // Define a 'password' field.
    password: {
      type: String,
      required: true, // This field is required.
    },
  },
  {
    // This option automatically adds two fields to our schema:
    // 'createdAt' and 'updatedAt'.
    timestamps: true,
  }
);

// Create the 'User' model from the schema. A Mongoose model is a wrapper on the
// Mongoose schema that provides an interface to the database for creating,
// querying, updating, deleting records, etc.
const User = mongoose.model('User', userSchema);

// Export the User model so it can be used in other parts of our application.
module.exports = User;
