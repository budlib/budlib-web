import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/useAuth';

const ModalLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  let loggedExpiry = window.localStorage.getItem('expiry');

  const handleLogout = () => {
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expiry');

    logout().then(() => {
      navigate('/');
    });
  };

  useEffect(() => {
    let tokenExpiry = new Date(loggedExpiry);
    let now = new Date();

    if (now > tokenExpiry) {
      window.alert('Your session has expired. Please login again.');
      handleLogout();
    }
  }, []);

  return (
    <div className='modal fade' id='logoutModal' tabIndex='-1' role='dialog' aria-labelledby='modalLabel' aria-hidden='true'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='modalLabel'>
              Alert
            </h5>
            <button className='close' type='button' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&#x00d7;</span>
            </button>
          </div>
          <div className='modal-body'>Are you sure you want to logout?</div>
          <div className='modal-footer'>
            <button className='btn btn-secondary' type='button' data-dismiss='modal'>
              Cancel
            </button>
            <button className='btn btn-primary' data-dismiss='modal' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
