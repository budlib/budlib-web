import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LoanerSearchBar from '../../components/LoanerSearchBar';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import SelectReturnerList from '../../components/SelectReturnerList';
import Sidebar from '../../components/Sidebar';
import { useTranslation } from 'react-i18next';

const SelectReturner = () => {
  const { t } = useTranslation('transactions');
  const [psearchBy, setSearchBy] = useState(['', '']);

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('returnBooks')} />
            <div className='container-fluid'>
              <LoanerSearchBar func={setSearchBy} />
              <SelectReturnerList searchBy={psearchBy[0]} searchTerm={psearchBy[1]} />
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

export default SelectReturner;
