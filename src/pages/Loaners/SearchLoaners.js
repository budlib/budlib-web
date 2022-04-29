import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LoanerList from '../../components/LoanerList';
import LoanerSearchBar from '../../components/LoanerSearchBar';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';

const SearchLoaners = () => {
  const [psearchBy, setSearchBy] = useState(['', '']);

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Search loaners' />
            <div className='container-fluid'>
              <LoanerSearchBar func={setSearchBy} />
              <LoanerList searchBy={psearchBy[0]} searchTerm={psearchBy[1]} />
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

export default SearchLoaners;
