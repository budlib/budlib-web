import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { useTranslation } from 'react-i18next';

const TransactionList = () => {
  const { t } = useTranslation('transactions');
  const url = '/api/transactions';
  const { data } = useFetch(url);

  return (
    <div className='row'>
      <div className='col-lg-10'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            <div className='table-responsive'>
              {data.length === 0 ? (
                t('notFound')
              ) : (
                <table className='table table-bordered table-hover' id='dataTable' cellSpacing='0'>
                  <thead className='table-secondary text-dark'>
                    <tr>
                      <th>{t('trnNo')}</th>
                      <th>{t('date')}</th>
                      <th>{t('time')}</th>
                      <th>{t('type')}</th>
                      <th>{t('loaner')}</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>{t('trnNo')}</th>
                      <th>{t('date')}</th>
                      <th>{t('time')}</th>
                      <th>{t('type')}</th>
                      <th>{t('loaner')}</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {data?.map((dataItem) => {
                      const { transactionId, transactionDateTime, transactionType, loaner } = dataItem;

                      const trnDateTime = new Date(transactionDateTime);

                      let month = '' + (trnDateTime.getMonth() + 1);
                      let day = '' + trnDateTime.getDate();
                      let year = trnDateTime.getFullYear();
                      if (month.length < 2) month = '0' + month;
                      if (day.length < 2) day = '0' + day;

                      let hour = '' + trnDateTime.getHours();
                      let minutes = '' + trnDateTime.getMinutes();
                      let seconds = '' + trnDateTime.getSeconds();
                      if (hour.length < 2) hour = '0' + hour;
                      if (minutes.length < 2) minutes = '0' + minutes;
                      if (seconds.length < 2) seconds = '0' + seconds;

                      const trnDate = [year, month, day].join('-');
                      const trnTime = [hour, minutes, seconds].join(':');

                      const trnType = t(transactionType);

                      return (
                        <tr key={transactionId}>
                          <td>
                            <Link
                              to={`/transactions/${transactionId}/view`}
                              style={{
                                display: 'block',
                                width: '100%',
                                color: 'inherit',
                              }}
                            >
                              {transactionId}
                            </Link>
                          </td>
                          <td>{trnDate}</td>
                          <td>{trnTime}</td>
                          <td>{trnType}</td>
                          <td>{loaner == null ? t('removed') : loaner['fullNameWithSalutation']}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
