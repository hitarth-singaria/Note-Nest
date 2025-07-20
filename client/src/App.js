// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing'; // Import the new Landing page

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            {/* If user is logged in, '/' goes to Dashboard, else to Landing */}
            <Route path='/' element={user ? <Dashboard /> : <Landing />} />
            
            {/* If user is logged in, accessing /login or /register will redirect to home */}
            <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
            <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
