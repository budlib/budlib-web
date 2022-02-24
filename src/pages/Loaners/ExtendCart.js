import React from 'react';
import BorrowCartList from '../../components/BorrowCartList';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import SelectBorrowerList from '../../components/SelectBorrowerList';
import LoanerSearchBar from '../../components/LoanerSearchBar';
import { useEffect, useState } from 'react';
import BookSearchBar from './../../components/BookSearchBar';
import ExtendCartList from './../../components/ExtendCartList';
const ExtendCart = () => {
  const [psearchBy, setSearchBy] = useState(["",""]);
  const [psearchTerm, setSearchTerm] = useState("");
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Add Books to Extend' />
            <div className='container-fluid'>

              <ExtendCartList searchBy={psearchBy[0]} searchTerm = {psearchBy[1]}/>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
};

export default ExtendCart;
