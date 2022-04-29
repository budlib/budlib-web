import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import ModalLogout from '../components/ModalLogout';
import ScrollTop from '../components/ScrollTop';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const loggedRole = window.localStorage.getItem('role');

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Home' />
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
                    Transact
                  </h4>
                  <div className='row pt-3'>
                    <MenuCard head='Borrow books' url='/transactions/borrow-books' src='/images/menu_borrow_books.svg' />
                    <MenuCard head='Return books' url='/transactions/return-books' src='/images/menu_return_books.svg' />
                    <MenuCard head='Extend books' url='/transactions/extend-books' src='/images/menu_provide_extension.svg' />
                    <MenuCard head='Past transactions' url='/transactions' src='/images/menu_past_transactions.svg' />
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
                    Database
                  </h4>
                  <div className='row pt-3'>
                    <MenuCard head='Search books' url='/books/search' src='/images/menu_search_books.svg' />
                    <MenuCard head='Add books' url='/books/add-book' src='/images/menu_add_book.svg' />
                    <MenuCard head='Search loaners' url='/loaners/search' src='/images/menu_search_loaners.svg' />
                    <MenuCard head='Add loaners' url='/loaners/add-loaner' src='/images/menu_add_loaner.svg' />
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
                    Dashboard
                  </h4>
                  <div className='row pt-3 pb-5'>
                    <MenuCard head='Dashboard home' url='/dashboard' src='/images/menu_dashboard.svg' />
                    <MenuCard head='Librarian management' url='/dashboard/librarian/search' src='/images/menu_librarian.svg' />
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className='row pt-3'>
                    <MenuCard head='Search books' url='/books/search' src='/images/menu_search_books.svg' />
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
