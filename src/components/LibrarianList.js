import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { useTranslation } from 'react-i18next';

const LibrarianList = (props) => {
  const { t } = useTranslation('librarians');
  const thisurl = '/api/librarian';
  const { data } = useFetch(thisurl);

  return (
    <div className='row'>
      <div className='col-lg-10'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            <div className='table-responsive'>
              {data.length === 1 ? (
                t('notFound')
              ) : (
                <table className='table table-bordered table-hover' id='dataTable' width='100%' cellSpacing='0'>
                  <thead className='table-secondary text-dark'>
                    <tr>
                      <th>{t('librarianId')}</th>
                      <th>{t('username')}</th>
                      <th>{t('email')}</th>
                      <th>{t('role')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((dataItem) => {
                      let { librarianId, userName, email, role } = dataItem;

                      if (librarianId.toString() !== window.localStorage.getItem('id')) {
                        return (
                          <tr key={librarianId}>
                            <td>
                              <Link
                                to={`/dashboard/librarian/${librarianId}/view`}
                                style={{
                                  display: 'block',
                                  width: '100%',
                                  color: 'inherit',
                                }}
                              >
                                {librarianId}
                              </Link>
                            </td>
                            <td>{userName}</td>
                            <td>{email}</td>
                            <td>{t(role)}</td>
                          </tr>
                        );
                      }
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

export default LibrarianList;
