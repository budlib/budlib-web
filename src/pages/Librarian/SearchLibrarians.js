import React from 'react';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import LibrarianList from '../../components/LibrarianList';
import { useNavigate } from 'react-router-dom';

const SearchLibrarians = () => {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading='Librarian management' />
            <div className='container-fluid'>
              <LibrarianList />

              <button
                type='button'
                className='btn btn-primary my-2'
                onClick={() => {
                  let path = `/librarian/add-librarian`;
                  navigate(path);
                }}
              >
                Add new librarian
              </button>
              <button
                type='button'
                className='btn btn-outline-danger mx-4 my-2'
                onClick={() => {
                  let path = `/dashboard`;
                  navigate(path);
                }}
              >
                Back to dashboard
              </button>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <ScrollTop />
    </React.Fragment>
  );
};

export default SearchLibrarians;
