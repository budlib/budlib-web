import React from 'react';
import BookBatchLoad from '../../components/BookBatchLoad';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import { useTranslation } from 'react-i18next';

const BookBatchUpload = () => {
  const { t } = useTranslation('dashboard');
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('importBooks')} />
            <div className='container-fluid'>
              <BookBatchLoad />
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

export default BookBatchUpload;
