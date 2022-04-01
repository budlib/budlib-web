import React from 'react';
import { Link } from 'react-router-dom';
import profilePic from '../assets/img/undraw_profile_3.svg';

const Header = (props) => {
  let loggedName = window.localStorage.getItem('username');
  let loggedId = window.localStorage.getItem('id');
  let loggedRole = window.localStorage.getItem('role');

  function handleToggle() {
    document.body.classList.toggle('sidebar-toggled');
    document.getElementById('accordionSidebar').classList.toggle('toggled');
  }

  let { heading } = props;
  heading = heading || '';

  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      <button id='sidebarToggleTop' className='btn btn-link d-md-none rounded-circle mr-3' onClick={handleToggle}>
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
            <span className='mr-2 d-none d-lg-inline text-gray-600 small'>{loggedName}</span>
            <img className='img-profile rounded-circle' src={profilePic} />
          </a>

          <div className='dropdown-menu dropdown-menu-right shadow animated--grow-in' aria-labelledby='userDropdown'>
            {loggedRole === 'ADMIN' ? (
              <React.Fragment>
                <Link className='dropdown-item' to={`/dashboard/librarian/${loggedId}/view`}>
                  <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
                  Profile
                </Link>
                <div className='dropdown-divider'></div>
              </React.Fragment>
            ) : (
              <></>
            )}
            <button className='dropdown-item' data-toggle='modal' data-target='#logoutModal'>
              <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
