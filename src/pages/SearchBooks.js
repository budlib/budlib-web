import React from 'react';

import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import ScrollTop from '../components/scrollTop';

function SearchBooks() {
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header />
            <div className='container-fluid'></div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
}

export default SearchBooks;
