import React from 'react';
import { useTranslation } from 'react-i18next';

const ViewTransactionDetailsCard = ({ data }) => {
  const { t } = useTranslation('transactions');
  const { transactionId, transactionDateTime, transactionType, loaner, librarian, bookCopies } = data;

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

  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <a href='#detailsCard' className='d-block card-header py-3' data-toggle='collapse' role='button' aria-expanded='true' aria-controls='detailsCard'>
          <h6 className='m-0 font-weight-bold text-primary'>{t('details')}</h6>
        </a>

        <div className='collapse show' id='detailsCard'>
          <div className='card-body'>
            <table className='table table-borderless'>
              <tbody>
                <tr>
                  <th style={{ width: '30%' }}>{t('transactionId')}</th>
                  <td>{transactionId}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('transactionType')}</th>
                  <td>{transactionType}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('transactionDate')}</th>
                  <td>{trnDate}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('transactionTime')}</th>
                  <td>{trnTime}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('coordinatorId')}</th>
                  <td>{librarian == null ? t('<removed>') : librarian['librarianId'] == null ? '-' : librarian['librarianId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('coordinatorName')}</th>
                  <td>{librarian == null ? t('<removed>') : librarian['fullName'] == null ? '-' : librarian['fullName']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('coordinatorEmail')}</th>
                  <td>{librarian == null ? t('<removed>') : librarian['email'] == null ? '-' : librarian['email']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('loanerType')}</th>
                  <td>{loaner == null ? t('<removed>') : loaner['isStudent'] === true ? t('STUDENT') : t('FACULTY')}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('loanerId')}</th>
                  <td>{loaner == null ? t('<removed>') : loaner['loanerId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{data['isStudent'] ? t('loanerSchoolId') : t('loanerEmployeeId')}</th>
                  <td>{loaner == null ? t('<removed>') : loaner['schoolId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('loanerName')}</th>
                  <td>{loaner == null ? t('<removed>') : loaner['fullNameWithSalutation']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('loanerEmail')}</th>
                  <td>{loaner == null ? t('<removed>') : loaner['email'] == null ? '-' : loaner['email']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('transactedBooks')}</th>
                  <td>
                    <div className='table-responsive'>
                      <table className='table table-borderless'>
                        <thead className='table-light text-dark'>
                          <tr>
                            <th>{t('title')}</th>
                            <th>{t('copies')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookCopies?.map((eachBookCopy) => {
                            const { book, copies } = eachBookCopy;

                            return (
                              <tr key={book['bookId']}>
                                <td style={{ width: '70%' }}>{book['title']}</td>
                                <td>{copies}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionDetailsCard;
