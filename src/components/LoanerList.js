import React from 'react';
import { useFetch } from '../helpers/useFetch';
// import { useDateFormat } from '../helpers/useDateFormat';

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
                let { loanerId, schoolId, salutation, fullName, student } = dataItem;

                if (student === true || student === 'true') {
                  student = 'Student';
                } else {
                  student = 'Faculty';

                  if (salutation != null && salutation.length !== 0) {
                    fullName = salutation + ' ' + fullName;
                  }
                }

                return (
                  <tr key={loanerId}>
                    <td>{loanerId}</td>
                    <td>{schoolId}</td>
                    <td>{fullName}</td>
                    <td>{student}</td>
                    <td>{0}</td>
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
