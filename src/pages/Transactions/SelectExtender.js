import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import ModalLogout from '../../components/ModalLogout';
import SelectExtenderList from '../../components/SelectExtenderList';
import LoanerSearchBar from '../../components/LoanerSearchBar';

const SelectExtender = () => {
  const [psearchBy, setSearchBy] = useState(['', '']);
  const [psearchTerm, setSearchTerm] = useState('');

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Select Borrower to Extend For' />
            <div className='container-fluid'>
              <LoanerSearchBar func={setSearchBy} />
              <SelectExtenderList searchBy={psearchBy[0]} searchTerm={psearchBy[1]} />
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

export default SelectExtender;
