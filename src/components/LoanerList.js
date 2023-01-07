import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { useTranslation } from 'react-i18next';

const LoanerList = (props) => {
  const { t } = useTranslation('loaners');
  const url = '/api/loaners';
  let thisurl = url + '?searchBy=' + props.searchBy + '&searchTerm=' + props.searchTerm;

  const { data } = useFetch(thisurl);

  return (
    <div className='row'>
      <div className='col-lg-10'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            {data.length === 0 ? (
              <div className='text-secondary pt-2 text-centerr'>No loaners found</div>
            ) : (
              <div className='table-responsive'>
                <table className='table table-bordered table-hover' id='dataTable' width='100%' cellSpacing='0'>
                  <thead className='table-secondary text-dark'>
                    <tr>
                      <th>{t('loanerId')}</th>
                      <th>{t('schoolId')}</th>
                      <th>{t('name')}</th>
                      <th>{t('type')}</th>
                      <th>{t('totalOutstanding')}</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>{t('loanerId')}</th>
                      <th>{t('schoolId')}</th>
                      <th>{t('name')}</th>
                      <th>{t('type')}</th>
                      <th>{t('totalOutstanding')}</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {data?.map((dataItem) => {
                      let { loanerId, schoolId, fullNameWithSalutation, isStudent, totalOutstanding } = dataItem;

                      if (isStudent === true || isStudent === 'true') {
                        isStudent = t('student');
                      } else {
                        isStudent = t('faculty');
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

export default LoanerList;
