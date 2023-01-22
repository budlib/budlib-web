import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { useTranslation } from 'react-i18next';

const SelectBorrowerList = (props) => {
  const { t } = useTranslation(['transactions', 'loaners']);
  const url = '/api/loaners';
  let thisurl = url + '?searchBy=' + props.searchBy + '&searchTerm=' + props.searchTerm;

  const { data } = useFetch(thisurl);

  return (
    <div className='row'>
      <div className='col-lg-10'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            {data.length === 0 ? (
              <div className='text-secondary pt-2 text-centerr'>{t('notFound', {ns: 'loaners'})}</div>
            ) : (
              <div className='table-responsive'>
                <table className='table table-bordered table-hover' id='dataTable' width='100%' cellSpacing='0'>
                  <thead className='table-secondary text-dark'>
                    <tr>
                      <th>{t('loanerId', {ns: 'loaners'})}</th>
                      <th>{t('schoolId', {ns: 'loaners'})}</th>
                      <th>{t('name', {ns: 'loaners'})}</th>
                      <th>{t('type', {ns: 'loaners'})}</th>
                      <th>{t('totalOutstanding', {ns: 'loaners'})}</th>
                      <th>{t('select')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((dataItem) => {
                      let { loanerId, schoolId, fullNameWithSalutation, isStudent, totalOutstanding } = dataItem;

                      if (isStudent === true || isStudent === 'true') {
                        isStudent = t('student', {ns: 'loaners'});
                      } else {
                        isStudent = t('faculty', {ns: 'loaners'});
                      }

                      return (
                        <tr key={loanerId}>
                          <td>
                            <Link
                              to={`/loaners/${loanerId}/view`}
                              style={{
                                display: 'block',
                                width: '100%',
                                color: 'inherit',
                              }}
                            >
                              {loanerId}
                            </Link>
                          </td>
                          <td>{schoolId}</td>
                          <td>{fullNameWithSalutation}</td>
                          <td>{isStudent}</td>
                          <td>{totalOutstanding}</td>
                          <td style={{ textAlign: 'center' }}>
                            <Link to={`/transactions/borrow-books/${loanerId}`} className='btn btn-sm btn-block btn-circle btn-outline-primary'>
                              <i className='fas fa-check'></i>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBorrowerList;
