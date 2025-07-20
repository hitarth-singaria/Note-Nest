// client/src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import { getNotes, reset } from '../features/notes/noteSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(getNotes());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return (
      <div className='page-center'>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <section className='heading'>
        <h1 style={{color: 'white'}}>Welcome {user && user.name}</h1>
        <p style={{color: 'white'}}>Your Personal Notes Dashboard</p>
      </section>

      <div className="form-container">
        <NoteForm />
      </div>

      <section className='content'>
        {notes.length > 0 ? (
          <div className='notes'>
            {notes.map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
          </div>
        ) : (
          <h3 style={{color: 'white'}}>You have not created any notes yet</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
