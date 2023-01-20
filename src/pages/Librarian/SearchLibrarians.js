import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LibrarianList from '../../components/LibrarianList';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import { useTranslation } from 'react-i18next';

const SearchLibrarians = () => {
  const { t } = useTranslation('librarians');
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
                  let path = `/dashboard/librarian/add-librarian`;
                  navigate(path);
                }}
              >
                {t('addLibrarian')}
              </button>
              <button
                type='button'
                className='btn btn-outline-danger mx-4 my-2'
                onClick={() => {
                  let path = `/dashboard`;
                  navigate(path);
                }}
              >
                {t('backToDashboard')}
              </button>
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

export default SearchLibrarians;
