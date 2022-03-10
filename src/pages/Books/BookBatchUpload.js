import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';

import BookBatchLoad from '../../components/BookBatchLoad';

const BookBatchUpload = () => {


  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
          <Header heading='Books Batch Upload' />
          <BookBatchLoad/>

          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
};

export default BookBatchUpload;
