// client/src/components/NoteItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, updateNote } from '../features/notes/noteSlice';

// SVG Icons for actions
const DustbinIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19C5,20.1 5.9,21 7,21H17C18.1,21 19,20.1 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z" /></svg>
);
const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17H7V14H5V19H10V17Z" /></svg>
);

function NoteItem({ note }) {
  const dispatch = useDispatch();
  
  // State for controlling the modals
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  // State for the edit form
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateNote({ ...note, ...editData }));
    setIsEditing(false);
  };

  const openEditModal = () => {
    setEditData({ title: note.title, content: note.content });
    setIsEditing(true);
  };

  return (
    <>
      <div className='note'>
        <div>
          <div className='note-date'>
            {new Date(note.createdAt).toLocaleString('en-US')}
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        <div className='note-actions'>
          <button className='icon-btn' onClick={() => setIsViewing(true)}><FullscreenIcon /></button>
          <button className='icon-btn' onClick={openEditModal}><EditIcon /></button>
          <button className='icon-btn' onClick={() => dispatch(deleteNote(note._id))}><DustbinIcon /></button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button className='modal-close-btn' onClick={() => setIsEditing(false)}>×</button>
            <h2>Edit Note</h2>
            <form onSubmit={handleUpdate}>
              <div className='form-group'>
                <label htmlFor='edit-title'>Title</label>
                <input
                  type='text'
                  id='edit-title'
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='edit-content'>Content</label>
                <textarea
                  id='edit-content'
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                ></textarea>
              </div>
              <div className='modal-actions'>
                <button type='button' className='btn' onClick={() => setIsEditing(false)}>Cancel</button>
                <button type='submit' className='btn'>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen View Modal */}
      {isViewing && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <button className='modal-close-btn' onClick={() => setIsViewing(false)}>×</button>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div className='modal-actions'>
              <button type='button' className='btn' onClick={() => setIsViewing(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteItem;
