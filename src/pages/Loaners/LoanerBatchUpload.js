import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LoanerBatchLoad from '../../components/LoanerBatchLoad';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import { useTranslation } from 'react-i18next';

const LoanerBatchUpload = () => {
  const { t } = useTranslation('dashboard');
  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('importLoaners')} />
            <div className='container-fluid'>
              <LoanerBatchLoad />
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

export default LoanerBatchUpload;
