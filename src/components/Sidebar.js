import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation('common');
  const loggedRole = window.localStorage.getItem('role');

  function handleToggle() {
    document.body.classList.toggle('sidebar-toggled');
    document.getElementById('accordionSidebar').classList.toggle('toggled');
  }

  return (
    <ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id='accordionSidebar'>
      <Link className='sidebar-brand d-flex align-items-center justify-content-center' to='/home'>
        <div className='sidebar-brand-icon rotate-n-15'>
          <i className='fas fa-book-open'></i>
        </div>
        <div className='sidebar-brand-text mx-3'>{t('appName')}</div>
      </Link>

      <hr className='sidebar-divider' />
      {loggedRole === 'ADMIN' ? (
        <React.Fragment>
          <div className='sidebar-heading'>{t('transact')}</div>

          <li className='nav-item'>
            <Link className='nav-link text-white' to='/transactions/borrow-books'>
              <i className='fas fa-fw fa-anchor'></i>
              <span>{t('borrowBooks')}</span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link text-white' to='/transactions/return-books'>
              <i className='fas fa-fw fa-award'></i>
              <span>{t('returnBooks')}</span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link text-white' to='/transactions/extend-books'>
              <i className='far fa-fw fa-calendar-check'></i>
              <span>{t('extendBooks')}</span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link text-white' to='/transactions'>
              <i className='fas fa-fw fa-chart-area'></i>
              <span>{t('pastTransactions')}</span>
            </Link>
          </li>

          <hr className='sidebar-divider' />

          <div className='sidebar-heading'>{t('database')}</div>
        </React.Fragment>
      ) : (
        ''
      )}
      <li className='nav-item'>
        <a className='nav-link collapsed text-white' href='#' data-toggle='collapse' data-target='#collapseBooks' aria-expanded='true' aria-controls='collapseBooks'>
          <i className='fas fa-fw fa-book'></i>
          <span>{t('books')}</span>
        </a>
        <div id='collapseBooks' className='collapse' aria-labelledby='headingTwo' data-parent='#accordionSidebar'>
          <div className='bg-white py-2 collapse-inner rounded'>
            <Link className='collapse-item' to='/books/search'>
            {t('searchBooks')}
            </Link>
            {loggedRole === 'ADMIN' ? (
              <React.Fragment>
                <Link className='collapse-item' to='/books/add-book'>
                {t('addBook')}
                </Link>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>
      </li>

      {loggedRole === 'ADMIN' ? (
        <React.Fragment>
          <li className='nav-item'>
            <a className='nav-link collapsed text-white' href='#' data-toggle='collapse' data-target='#collapseLoaners' aria-expanded='true' aria-controls='collapseLoaners'>
              <i className='fas fa-fw fa-user'></i>
              <span>{t('loaners')}</span>
            </a>
            <div id='collapseLoaners' className='collapse' aria-labelledby='headingUtilities' data-parent='#accordionSidebar'>
              <div className='bg-white py-2 collapse-inner rounded'>
                <Link className='collapse-item' to='/loaners/search'>
                {t('searchLoaners')}
                </Link>
                <Link className='collapse-item' to='/loaners/add-loaner'>
                {t('addLoaner')}
                </Link>
              </div>
            </div>
          </li>

          <hr className='sidebar-divider' />

          <div className='sidebar-heading'>{t('admin')}</div>

          <li className='nav-item'>
            <Link className='nav-link text-white' to='/dashboard'>
              <i className='fas fa-fw fa-tachometer-alt'></i>
              <span>{t('dashboard')}</span>
            </Link>
          </li>

          <hr className='sidebar-divider d-none d-md-block' />
        </React.Fragment>
      ) : (
        ''
      )}
      <div className='text-center d-none d-md-inline'>
        <button className='rounded-circle border-0' id='sidebarToggle' onClick={handleToggle}></button>
      </div>
    </ul>
  );
};

export default Sidebar;
