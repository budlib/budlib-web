import React from 'react';

const ViewLoanerDetailsCard = ({ data }) => {
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
                  <th style={{ width: '30%' }}>Loaner ID</th>
                  <td>{data['loanerId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Loaner Type</th>
                  <td>{data['isStudent'] ? 'Student' : 'Faculty'}</td>
                </tr>

                {data['salutation'] ? (
                  <tr>
                    <th style={{ width: '30%' }}>Salutation</th>
                    <td>{data['salutation'] || 'not given'}</td>
                  </tr>
                ) : (
                  <></>
                )}

                <tr>
                  <th style={{ width: '30%' }}>{data['isStudent'] ? 'School ID' : 'Employee ID'}</th>
                  <td>{data['schoolId']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>First Name</th>
                  <td>{data['firstName']}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Middle Name</th>
                  <td>{data['middleName'] || 'not given'}</td>
                </tr>
                <tr>
                  <th style={{ width: '30%' }}>Last Name</th>
                  <td>{data['lastName'] || 'not given'}</td>
                </tr>

                <tr>
                  <th style={{ width: '30%' }}>Email</th>
                  <td>{data['email'] || 'not given'}</td>
                </tr>

                {data['isStudent'] ? (
                  <tr>
                    <th style={{ width: '30%' }}>Father's name</th>
                    <td>{data['fatherName'] || 'not given'}</td>
                  </tr>
                ) : (
                  <></>
                )}

                {data['isStudent'] ? (
                  <tr>
                    <th style={{ width: '30%' }}>Mother's name</th>
                    <td>{data['motherName'] || 'not given'}</td>
                  </tr>
                ) : (
                  <></>
                )}

                <tr>
                  <th style={{ width: '30%' }}>Borrowed books</th>
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
