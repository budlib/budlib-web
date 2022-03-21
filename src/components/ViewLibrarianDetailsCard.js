import React from 'react';

const ViewLibrarianDetailsCard = ({ data }) => {
  return (
    <div className='col-lg-8'>
      <div className='card shadow mb-4'>
        <div className='card-header py-3'>
          <h6 className='m-0 font-weight-bold text-primary'>Details</h6>
        </div>

        <div className='card-body'>
          <table className='table table-borderless'>
            <tbody>
              <tr>
                <th style={{ width: '30%' }}>Librarian ID</th>
                <td>{data['librarianId']}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>Role</th>
                <td>{data['role']}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>Username</th>
                <td>{data['userName']}</td>
              </tr>
              <tr>
                <th style={{ width: '30%' }}>Email</th>
                <td>{data['email'] || 'not given'}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewLibrarianDetailsCard;
