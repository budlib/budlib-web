import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id='accordionSidebar'>
      <Link className='sidebar-brand d-flex align-items-center justify-content-center' to='/home'>
        <div className='sidebar-brand-icon rotate-n-15'>
          <i className='fas fa-book-open'></i>
        </div>
        <div className='sidebar-brand-text mx-3'>BudLib</div>
      </Link>

      <hr className='sidebar-divider' />

      <div className='sidebar-heading'>Action</div>

      <li className='nav-item'>
        <Link className='nav-link text-white' to='/loaners/borrow-books'>
          <i className='fas fa-fw fa-anchor'></i>
          <span>Borrow books</span>
        </Link>
      </li>

      <li className='nav-item'>
        <Link className='nav-link text-white' to='/loaners/return-books'>
          <i className='fas fa-fw fa-award'></i>
          <span>Return books</span>
        </Link>
      </li>

      <li className='nav-item'>
        <Link className='nav-link text-white' to='/loaners/provide-extension'>
          <i className='far fa-fw fa-calendar-check'></i>
          <span>Provide extension</span>
        </Link>
      </li>

      <hr className='sidebar-divider' />

      <div className='sidebar-heading'>Database</div>

      <li className='nav-item'>
        <a className='nav-link collapsed text-white' href='#' data-toggle='collapse' data-target='#collapseBooks' aria-expanded='true' aria-controls='collapseBooks'>
          <i className='fas fa-fw fa-book'></i>
          <span>Books</span>
        </a>
        <div id='collapseBooks' className='collapse' aria-labelledby='headingTwo' data-parent='#accordionSidebar'>
          <div className='bg-white py-2 collapse-inner rounded'>
            <Link className='collapse-item' to='/books/search'>
              Search books
            </Link>
            <Link className='collapse-item' to='/books/add-book'>
              Add a book
            </Link>
          </div>
        </div>
      </li>

      <li className='nav-item'>
        <a className='nav-link collapsed text-white' href='#' data-toggle='collapse' data-target='#collapseLoaners' aria-expanded='true' aria-controls='collapseLoaners'>
          <i className='fas fa-fw fa-user'></i>
          <span>Loaners</span>
        </a>
        <div id='collapseLoaners' className='collapse' aria-labelledby='headingUtilities' data-parent='#accordionSidebar'>
          <div className='bg-white py-2 collapse-inner rounded'>
            <Link className='collapse-item' to='/loaners/search'>
              Search loaners
            </Link>
            <Link className='collapse-item' to='/loaners/add-loaner'>
              Add a loaner
            </Link>
          </div>
        </div>
      </li>

      <li className='nav-item'>
        <Link className='nav-link text-white' to='/transactions'>
          <i className='fas fa-fw fa-chart-area'></i>
          <span>Transactions</span>
        </Link>
      </li>

      <hr className='sidebar-divider' />

      <div className='sidebar-heading'>Admin</div>

      <li className='nav-item'>
        <Link className='nav-link text-white' to='/dashboard'>
          <i className='fas fa-fw fa-tachometer-alt'></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className='sidebar-divider d-none d-md-block' />

      <div className='text-center d-none d-md-inline'>
        <button className='rounded-circle border-0' id='sidebarToggle'></button>
      </div>
    </ul>
  );
};

export default Sidebar;
