import React from 'react';

const ViewTransactionDetailsCard = ({ data }) => {
  const { transactionId, transactionDateTime, transactionType, loaner, librarian, bookCopies } = data;

  const trnDateTime = new Date(transactionDateTime);

  let month = '' + (trnDateTime.getMonth() + 1);
  let day = '' + trnDateTime.getDate();
  let year = trnDateTime.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  let hour = '' + trnDateTime.getHours();
  let minutes = '' + trnDateTime.getMinutes();
  let seconds = '' + trnDateTime.getSeconds();
  if (hour.length < 2) hour = '0' + hour;
  if (minutes.length < 2) minutes = '0' + minutes;
  if (seconds.length < 2) seconds = '0' + seconds;

  const trnDate = [year, month, day].join('-');
  const trnTime = [hour, minutes, seconds].join(':');

  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <a href='#detailsCard' className='d-block card-header py-3' data-toggle='collapse' role='button' aria-expanded='true' aria-controls='detailsCard'>
          <h6 className='m-0 font-weight-bold text-primary'>Details</h6>
        </a>

        <div className='collapse show' id='detailsCard'>
          <div className='card-body'>
            <table className='table table-borderless'>
              <tbody>
                <tr>
                  <th style={{ width: '30%' }}>Transaction ID</th>
                  <td>{transactionId}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Transaction type</th>
                  <td>{transactionType}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Transaction date</th>
                  <td>{trnDate}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Transaction time</th>
                  <td>{trnTime}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Coordinator's ID</th>
                  <td>{librarian == null ? '<removed>' : librarian['librarianId'] == null ? '-' : librarian['librarianId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Coordinator's full name</th>
                  <td>{librarian == null ? '<removed>' : librarian['fullName'] == null ? '-' : librarian['fullName']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Coordinator's email</th>
                  <td>{librarian == null ? '<removed>' : librarian['email'] == null ? '-' : librarian['email']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Loaner type</th>
                  <td>{loaner == null ? '<removed>' : loaner['isStudent'] == true ? 'Student' : 'Faculty'}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Loaner ID</th>
                  <td>{loaner == null ? '<removed>' : loaner['loanerId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>{data['isStudent'] ? "Loaner's school ID" : "Loaner's employee ID"}</th>
                  <td>{loaner == null ? '<removed>' : loaner['schoolId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Loaner's full name</th>
                  <td>{loaner == null ? '<removed>' : loaner['fullNameWithSalutation']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Loaner's email</th>
                  <td>{loaner == null ? '<removed>' : loaner['email'] == null ? '-' : loaner['email']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Borrowed books</th>
                  <td>
                    <div className='table-responsive'>
                      <table className='table table-borderless'>
                        <thead className='table-light text-dark'>
                          <tr>
                            <th>Title</th>
                            <th>Copies</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookCopies?.map((eachBookCopy) => {
                            const { book, copies } = eachBookCopy;

                            return (
                              <tr key={book['bookId']}>
                                <td style={{ width: '70%' }}>{book['title']}</td>
                                <td>{copies}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTransactionDetailsCard;
