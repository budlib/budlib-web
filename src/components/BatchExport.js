import React from 'react';
import { downloadCall } from '../helpers/downloadCall';
import { useTranslation } from 'react-i18next';

const BatchExport = () => {
  const { t } = useTranslation('dashboard');

  const exportBooks = () => {
    downloadCall('/api/dashboard/batch/export/books', 'budlib_books_export.csv');
  };

  const exportLoaners = () => {
    downloadCall('/api/dashboard/batch/export/loaners', 'budlib_loaners_export.csv');
  };

  const exportLoans = () => {
    downloadCall('/api/dashboard/batch/export/loans', 'budlib_outstanding_loans_export.csv');
  };

  const exportTransactions = () => {
    downloadCall('/api/dashboard/batch/export/transactions', 'budlib_transactions_export.csv');
  };

  return (
    <React.Fragment>
      <div className='col-lg-6 mb-4'>
        <div className='card text-white shadow'>
          <button type='button' style={{ padding: '33px 20px' }} className='btn btn-success btn-block' onClick={() => exportBooks()}>
            {t('exportBooks')}
          </button>
        </div>
      </div>
      <div className='col-lg-6 mb-4'>
        <div className='card text-white shadow'>
          <button type='button' style={{ padding: '33px 20px' }} className='btn btn-warning btn-block' onClick={() => exportLoaners()}>
            {t('exportLoaners')}
          </button>
        </div>
      </div>
      <div className='col-lg-6 mb-4'>
        <div className='card text-white shadow'>
          <button type='button' style={{ padding: '33px 20px' }} className='btn btn-danger btn-block' onClick={() => exportLoans()}>
            {t('exportLoans')}
          </button>
        </div>
      </div>
      <div className='col-lg-6 mb-4'>
        <div className='card text-white shadow'>
          <button type='button' style={{ padding: '33px 20px' }} className='btn btn-info btn-block' onClick={() => exportTransactions()}>
            {t('exportTransactions')}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BatchExport;
