import React from 'react';
import { useTranslation } from 'react-i18next';

const ViewLoanerDetailsCard = ({ data }) => {
  const { t } = useTranslation('loaners');

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
                  <th style={{ width: '30%' }}>{t('loanerId')}</th>
                  <td>{data['loanerId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('loanerType')}</th>
                  <td>{data['isStudent'] ? t('student') : t('faculty')}</td>
                </tr>

                {data['salutation'] ? (
                  <tr>
                    <th style={{ width: '30%' }}>{t('salutation')}</th>
                    <td>{data['salutation'] || '-'}</td>
                  </tr>
                ) : (
                  <></>
                )}

                <tr>
                  <th style={{ width: '30%' }}>{data['isStudent'] ? t('schoolId') : t('employeeId')}</th>
                  <td>{data['schoolId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('firstName')}</th>
                  <td>{data['firstName']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('middleName')}</th>
                  <td>{data['middleName'] || '-'}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{t('lastName')}</th>
                  <td>{data['lastName'] || '-'}</td>
                </tr>

                <tr>
                  <th style={{ width: '30%' }}>{t('email')}</th>
                  <td>{data['email'] || '-'}</td>
                </tr>

                {data['isStudent'] ? (
                  <tr>
                    <th style={{ width: '30%' }}>{t('fatherName')}</th>
                    <td>{data['fatherName'] || '-'}</td>
                  </tr>
                ) : (
                  <></>
                )}

                {data['isStudent'] ? (
                  <tr>
                    <th style={{ width: '30%' }}>{t('motherName')}</th>
                    <td>{data['motherName'] || '-'}</td>
                  </tr>
                ) : (
                  <></>
                )}

                <tr>
                  <th style={{ width: '30%' }}>{t('borrowedBooks')}</th>
                  <td>{data['totalOutstanding']}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLoanerDetailsCard;
