// server/controllers/noteController.js

const asyncHandler = require('express-async-handler');
const Note = require('../models/Note');
const User = require('../models/User');

// @desc    Get all notes for a user
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json(notes);
});

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Please add a title and content');
  }

  const note = await Note.create({
    title,
    content,
    user: req.user.id,
  });

  res.status(201).json(note);
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  // Find the note by its ID from the URL parameters
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  // Check if the note belongs to the logged-in user
  if (note.user.toString() !== req.user.id) {
    res.status(401); // Unauthorized
    throw new Error('User not authorized');
  }

  // Perform the update and get the new, updated document back
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }

  // Check if the note belongs to the logged-in user
  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Mongoose v6+ findByIdAndRemove is deprecated
  await Note.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id, message: 'Note removed' });
});


module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
