import React from 'react';
import { useFetch } from '../helpers/useFetch';
import { Link } from 'react-router-dom';

const url = 'http://localhost:8080/api/loaners';

const LoanerList = () => {
  const { loading, data } = useFetch(url);

  return (
    <div className='card shadow mb-4'>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table table-bordered' id='dataTable' width='100%' cellSpacing='0'>
            <thead>
              <tr>
                <th>Loaner ID</th>
                <th>School ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Total outstanding</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Loaner ID</th>
                <th>School ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Total outstanding</th>
              </tr>
            </tfoot>
            <tbody>
              {data.map((dataItem) => {
                let { loanerId, schoolId, fullNameWithSalutation, isStudent, totalOutstanding } = dataItem;

                if (isStudent === true || isStudent === 'true') {
                  isStudent = 'Student';
                } else {
                  isStudent = 'Faculty';
                }

                return (
                  <tr key={loanerId}>
                    <td>
                      <Link
                        to={`/loaners/view/${loanerId}`}
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
      </div>
    </div>
  );
};

export default LoanerList;
