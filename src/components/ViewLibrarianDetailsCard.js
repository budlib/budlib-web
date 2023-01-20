import React from 'react';
import { useTranslation } from 'react-i18next';

const ViewLibrarianDetailsCard = ({ data }) => {
  const { t } = useTranslation('librarians');

  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <div className='card-header py-3'>
          <h6 className='m-0 font-weight-bold text-primary'>{t('details')}</h6>
        </div>

        <div className='card-body'>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th style={{ width: '30%' }}>{t('librarianId')}</th>
                <td>{data['librarianId']}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('role')}</th>
                <td>{t(data['role'])}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('username')}</th>
                <td>{data['userName']}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>{t('email')}</th>
                <td>{data['email'] || '-'}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewLibrarianDetailsCard;
