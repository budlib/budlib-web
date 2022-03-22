import React from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import MenuCard from '../components/MenuCard';

const Home = () => {
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Home' />
            <div className='container-fluid'>
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
                <MenuCard head='Borrow books' url='/loaners/borrow-books' src='/images/menu_borrow_books.svg' />
                <MenuCard head='Return books' url='/loaners/return-books' src='/images/menu_return_books.svg' />
                <MenuCard head='Extend books' url='/loaners/extend-books' src='/images/menu_provide_extension.svg' />
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
              <div className='row pt-3'>
                <MenuCard head='Dashboard home' url='/dashboard' src='/images/menu_dashboard.svg' />
                <MenuCard head='Librarian management' url='/dashboard/librarian/search' src='/images/menu_librarian.svg' />
                <MenuCard head='Batch import export' url='/dashboard/batch-import-export' src='/images/menu_batch.svg' />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
};

export default Home;
