import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import ModalLogout from '../../components/ModalLogout';
import BookSearchBar from './../../components/BookSearchBar';
import BorrowCartList from '../../components/BorrowCartList';

const BorrowCart = () => {
  const [psearchBy, setSearchBy] = useState(['', '']);
  const [psearchTerm, setSearchTerm] = useState('');

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Add Books to Borrow' />
            <div className='container-fluid'>
              <BookSearchBar func={setSearchBy} />
              <BorrowCartList searchBy={psearchBy[0]} searchTerm={psearchBy[1]} />
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

export default BorrowCart;
