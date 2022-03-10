import React from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import LoanerEditForm from '../../components/LoanerEditForm';
import LibrarianEditForm from '../../components/LibrarianEditForm';

function EditLibrarian() {
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Edit librarian' />
            <div className='container-fluid'>
              <LibrarianEditForm />
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
}

export default EditLibrarian;
