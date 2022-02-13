import React from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import BookAddForm from '../../components/BookAddForm';

function AddBook() {
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Add book' />
            <div className='container-fluid'>
              <BookAddForm />
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
}

export default AddBook;
