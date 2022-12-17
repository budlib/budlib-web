import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import ModalLogout from '../components/ModalLogout';
import ScrollTop from '../components/ScrollTop';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation('common'); 
  const loggedRole = window.localStorage.getItem('role');

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('heading')} />
            <div className='container-fluid'>
              {loggedRole === 'ADMIN' ? (
                <React.Fragment>
                  <h4
                    style={{
                      fontFamily: 'monospace',
                      fontVariant: 'small-caps',
                      fontSize: '1.25em',
                      fontWeight: 'bold',
                    }}
                    className='pt-3'
                  >
                    {t('transact')}
                  </h4>
                  <div className='row pt-3'>
                    <MenuCard head={t('borrowBooks')} url='/transactions/borrow-books' src='/images/menu_borrow_books.svg' />
                    <MenuCard head={t('returnBooks')} url='/transactions/return-books' src='/images/menu_return_books.svg' />
                    <MenuCard head={t('extendBooks')} url='/transactions/extend-books' src='/images/menu_provide_extension.svg' />
                    <MenuCard head={t('pastTransactions')} url='/transactions' src='/images/menu_past_transactions.svg' />
                  </div>

                  <h4
                    style={{
                      fontFamily: 'monospace',
                      fontVariant: 'small-caps',
                      fontSize: '1.25em',
                      fontWeight: 'bold',
                    }}
                    className='pt-3'
                  >
                    {t('database')}
                  </h4>
                  <div className='row pt-3'>
                    <MenuCard head={t('searchBooks')} url='/books/search' src='/images/menu_search_books.svg' />
                    <MenuCard head={t('addBook')} url='/books/add-book' src='/images/menu_add_book.svg' />
                    <MenuCard head={t('searchLoaners')} url='/loaners/search' src='/images/menu_search_loaners.svg' />
                    <MenuCard head={t('addLoaner')} url='/loaners/add-loaner' src='/images/menu_add_loaner.svg' />
                  </div>

                  <h4
                    style={{
                      fontFamily: 'monospace',
                      fontVariant: 'small-caps',
                      fontSize: '1.25em',
                      fontWeight: 'bold',
                    }}
                    className='pt-3'
                  >
                    {t('dashboard')}
                  </h4>
                  <div className='row pt-3 pb-5'>
                    <MenuCard head={t('dashboardHome')} url='/dashboard' src='/images/menu_dashboard.svg' />
                    <MenuCard head={t('librarianManagement')} url='/dashboard/librarian/search' src='/images/menu_librarian.svg' />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className='row pt-3'>
                    <MenuCard head={t('Search books')} url='/books/search' src='/images/menu_search_books.svg' />
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
      <ModalLogout />
    </React.Fragment>
  );
};

export default Home;
