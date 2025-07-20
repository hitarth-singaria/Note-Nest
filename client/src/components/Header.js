// client/src/components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className='header'>
      <div className="container">
        <div className='logo'>
          <Link to='/'>Note Nest</Link>
        </div>
        <ul>
          {user ? (
            <div className='profile-menu' ref={dropdownRef}>
              <div className='profile-icon' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span>{user.name.charAt(0)}</span>
              </div>
              {isDropdownOpen && (
                <div className='dropdown-menu'>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <hr />
                  <button className='btn btn-block' onClick={onLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <li>
                <Link to='/login' className="btn">Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
