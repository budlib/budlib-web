import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LibrarianAddForm from '../../components/LibrarianAddForm';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import { useTranslation } from 'react-i18next';

function AddLibrarian() {
  const { t } = useTranslation('librarians');

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('addLibrarian')} />
            <div className='container-fluid'>
              <LibrarianAddForm />
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

export default AddLibrarian;
