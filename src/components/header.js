import React from 'react';
import profilePic from '../assets/img/undraw_profile_3.svg';

const header = () => {
  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item dropdown no-arrow'>
          <a className='nav-link dropdown-toggle' href='#' id='userDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            <span className='mr-2 d-none d-lg-inline text-gray-600 small'>Douglas McGee</span>
            <img className='img-profile rounded-circle' src={profilePic} />
          </a>

          <div className='dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby='userDropdown'>
            <a className='dropdown-item' href='#'>
              <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
              Profile
            </a>
            <div className='dropdown-divider'></div>
            <a className='dropdown-item' href='#' data-toggle='modal' data-target='#logoutModal'>
              <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default header;
