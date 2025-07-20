// client/src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import noteReducer from '../features/notes/noteSlice'; // Import the new note reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer, // Add the note reducer to the store
  },
});
