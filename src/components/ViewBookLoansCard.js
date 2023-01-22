import React from 'react';
import { useTranslation } from 'react-i18next';

const ViewBookLoansCard = ({ data }) => {
  const { t } = useTranslation('books');

  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <a href='#loansCard' className='d-block card-header py-3' data-toggle='collapse' role='button' aria-expanded='true' aria-controls='loansCard'>
          <h6 className='m-0 font-weight-bold text-primary'>{t('currentLoans')}</h6>
        </a>

        <div className='collapse show' id='loansCard'>
          <div className='card-body'>
            <div className='table-responsive'>
              {data.length === 0 ? (
                t('noLoans')
              ) : (
                <table className='table table-bordered table-hover'>
                  <thead className='table-secondary text-dark'>
                    <tr>
                      <th>{t('loanerId')}</th>
                      <th>{t('fullName')}</th>
                      <th>{t('copies')}</th>
                      <th>{t('borrowDate')}</th>
                      <th>{t('dueDate')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((dataItem) => {
                      return (
                        <React.Fragment key={dataItem['loanId']}>
                          <tr>
                            <td>{dataItem['loaner']['loanerId']}</td>
                            <td>{dataItem['loaner']['fullNameWithSalutation']}</td>
                            <td>{dataItem['copies']}</td>
                            <td>{dataItem['borrowDate']}</td>
                            <td>{dataItem['dueDate']}</td>
                          </tr>
                        </React.Fragment>
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

export default ViewBookLoansCard;
