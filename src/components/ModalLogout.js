import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/useAuth';
import { useTranslation } from 'react-i18next';

const ModalLogout = () => {
  const { t } = useTranslation();
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
      window.alert(t('expiredSession'));
      handleLogout();
    }
  }, []);

  return (
    <div className='modal fade' id='logoutModal' tabIndex='-1' role='dialog' aria-labelledby='modalLabel' aria-hidden='true'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='modalLabel'>
              {t('alert')}
            </h5>
            <button className='close' type='button' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&#x00d7;</span>
            </button>
          </div>
          <div className='modal-body'>{t('confirmLogout')}</div>
          <div className='modal-footer'>
            <button className='btn btn-secondary' type='button' data-dismiss='modal'>
              {t('Cancel')}
            </button>
            <button className='btn btn-primary' data-dismiss='modal' onClick={handleLogout}>
              {t('Logout')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
