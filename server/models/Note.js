// server/models/Note.js

const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    // This is a special field to link a note to a specific user.
    // 'mongoose.Schema.Types.ObjectId' is the type for a unique ID that MongoDB creates.
    // The 'ref' property tells Mongoose which model to use during population,
    // in this case, the 'User' model.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // Define a 'title' for the note.
    title: {
      type: String,
      required: true,
    },
    // Define the 'content' of the note.
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add 'createdAt' and 'updatedAt' fields.
  }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
