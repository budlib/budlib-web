import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import LoanerSearchBar from '../../components/LoanerSearchBar';
import ModalLogout from '../../components/ModalLogout';
import ScrollTop from '../../components/ScrollTop';
import SelectExtenderList from '../../components/SelectExtenderList';
import Sidebar from '../../components/Sidebar';
import { useTranslation } from 'react-i18next';

const SelectExtender = () => {
  const { t } = useTranslation('transactions');
  const [psearchBy, setSearchBy] = useState(['', '']);

  return (
    <React.Fragment>
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <div id='content'>
            <Header heading={t('extendLoan')} />
            <div className='container-fluid'>
              <LoanerSearchBar func={setSearchBy} />
              <SelectExtenderList searchBy={psearchBy[0]} searchTerm={psearchBy[1]} />
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

export default SelectExtender;
