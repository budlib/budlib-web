import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { useTranslation } from 'react-i18next';

const ViewLoanerHistoryCard = () => {
  const { t } = useTranslation('loaners');
  const { id } = useParams();

  let loanerHistoryUrl = `/api/loaners/${id}/history`;
  const { data } = useFetch(loanerHistoryUrl);

  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <a href='#historyCard' className='d-block card-header py-3' data-toggle='collapse' role='button' aria-expanded='true' aria-controls='historyCard'>
          <h6 className='m-0 font-weight-bold text-primary'>{t('history')}</h6>
        </a>

        <div className='collapse show' id='historyCard'>
          <div className='card-body'>
            <div className='table-responsive'>
              {data.length === 0 ? (
                'No history found'
              ) : (
                <table className='table table-bordered table-hover' id='dataTable' cellSpacing='0'>
                  <thead className='table-secondary text-dark'>
                    <tr>
                      <th>{t('transactionNumber')}</th>
                      <th>{t('transactionDate')}</th>
                      <th>{t('transactionTime')}</th>
                      <th>{t('transactionType')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((dataItem) => {
                      const { transactionId, transactionDateTime, transactionType } = dataItem;

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

export default ViewLoanerHistoryCard;
