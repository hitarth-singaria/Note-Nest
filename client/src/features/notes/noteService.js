// client/src/features/notes/noteService.js
import axios from 'axios';

const API_URL = '/api/notes/';

// Create new note
const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, noteData, config);
  return response.data;
};

// Get user notes
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Update user note
const updateNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // We send the note's ID in the URL and the new data in the body
  const response = await axios.put(API_URL + noteData._id, noteData, config);
  return response.data;
};

// Delete user note
const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + noteId, config);
  return response.data;
};

const noteService = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};

export default noteService;
