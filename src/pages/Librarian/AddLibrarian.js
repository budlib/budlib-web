import React from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import LoanerAddForm from '../../components/LoanerAddForm';
import LibrarianAddForm from '../../components/LibrarianAddForm';

function AddLibrarian() {
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Add Librarian' />
            <div className='container-fluid'>
              <LibrarianAddForm />
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
}

export default AddLibrarian;
