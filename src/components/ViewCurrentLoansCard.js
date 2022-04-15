import React from 'react';

const ViewCurrentLoansCard = ({ data }) => {
  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <a href='#loansCard' className='d-block card-header py-3' data-toggle='collapse' role='button' aria-expanded='true' aria-controls='loansCard'>
          <h6 className='m-0 font-weight-bold text-primary'>Loans</h6>
        </a>

        <div className='collapse show' id='loansCard'>
          <div className='card-body'>
            <div className='table-responsive'>
              {data.length === 0 ? (
                'No outstanding books found'
              ) : (
                <table className='table table-bordered table-hover'>
                  <thead className='table-secondary text-dark'>
                    <tr>
                      <th style={{ width: '15%' }}>Book ISBN</th>
                      <th style={{ width: '40%' }}>Book title</th>
                      <th style={{ width: '10%' }}>Copies</th>
                      <th style={{ width: '18%' }}>Borrow date</th>
                      <th style={{ width: '17%' }}>Due date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((dataItem) => {
                      return (
                        <React.Fragment key={dataItem['loanId']}>
                          <tr>
                            <td>{dataItem['book']['isbn_10'] || dataItem['book']['isbn_13'] || '-'}</td>
                            <td>{dataItem['book']['title']}</td>
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

export default ViewCurrentLoansCard;
