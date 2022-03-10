import React from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import LoanerList from '../../components/LoanerList';
import LoanerSearchBar from '../../components/LoanerSearchBar';
import { useState } from 'react';

const SearchLoaners = () => {
  const [psearchBy, setSearchBy] = useState(['', '']);
  // const [psearchTerm, setSearchTerm] = useState('');

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
    </React.Fragment>
  );
};

export default SearchLoaners;
