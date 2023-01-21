import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import Sidebar from '../../components/Sidebar';
import TransactionList from '../../components/TransactionList';
import { useTranslation } from 'react-i18next';

const SearchTransactions = () => {
  const { t } = useTranslation('transactions');

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('pastTransactions')} />
            <div className='container-fluid'>
              <TransactionList />
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

export default SearchTransactions;
