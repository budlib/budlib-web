import React from 'react';
import { Link } from 'react-router-dom';

import profilePic from '../assets/img/undraw_profile_3.svg';

const Header = (props) => {
  let { heading } = props;
  heading = heading || '';

  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      <button id='sidebarToggleTop' className='btn btn-link d-md-none rounded-circle mr-3'>
        <i className='fa fa-bars'></i>
      </button>
      <h4
        className='text-dark px-3 text-capitalize font-weight-bold o-hidden'
        style={{
          maxWidth: '70%',
          textOverflow: 'ellipsis',
          WebkitLineClamp: '1',
          lineClamp: '1',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {heading}
      </h4>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item dropdown no-arrow'>
          <a className='nav-link dropdown-toggle' href='#' id='userDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            <span className='mr-2 d-none d-lg-inline text-gray-600 small'>Douglas McGee</span>
            <img className='img-profile rounded-circle' src={profilePic} />
          </a>

          <div className='dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby='userDropdown'>
            <Link className='dropdown-item' to='/librarian/profile'>
              <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
              Profile
            </Link>
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

export default Header;
