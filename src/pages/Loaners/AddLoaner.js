import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LoanerAddForm from '../../components/LoanerAddForm';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';

function AddLoaner() {
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Add loaner' />
            <div className='container-fluid'>
              <LoanerAddForm />
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
      <ModalLogout />
    </React.Fragment>
  );
}

export default AddLoaner;
