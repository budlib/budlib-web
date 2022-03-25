import React from 'react';
import { useFetch } from '../helpers/useFetch';
import { Link } from 'react-router-dom';

const SelectExtenderList = (props) => {
  const url = '/api/loaners';
  let thisurl = url + '?searchBy=' + props.searchBy + '&searchTerm=' + props.searchTerm;

  const { data } = useFetch(thisurl);

  return (
    <div className='row'>
      <div className='col-lg-10'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-bordered table-hover' id='dataTable' width='100%' cellSpacing='0'>
                <thead className='table-secondary text-dark'>
                  <tr>
                    <th>Loaner ID</th>
                    <th>School ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Total outstanding</th>
                    <th>Select</th>
                  </tr>
                </thead>
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
                            to={`/transactions/${loanerId}/view`}
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
                        <td>
                          <Link to={`/transactions/extend-books/${loanerId}`} className='btn btn-sm btn-block btn-outline-primary'>
                            <i className='fas fa-check'></i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectExtenderList;
