import React from 'react';
import { useFetch } from '../helpers/useFetch';
import { Link } from 'react-router-dom';

const url = '/api/librarian';

const LibrarianList = (props) => {
  let thisurl = url + '?searchBy=' + props.searchBy + '&searchTerm=' + props.searchTerm;
  console.log(thisurl);

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
                    <th>Librarian ID</th>
                    <th>User Name</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                  <th>Librarian ID</th>
                    <th>User Name</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </tfoot>
                <tbody>
                  {data.map((dataItem) => {
                    let { librarianId, userName, firstName, lastName, email, role } = dataItem;



                    return (
                      <tr key={librarianId}>
                        <td>
                          <Link
                            to={`/librarian/${librarianId}/view`}
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
                        <td>{firstName+" "+lastName}</td>
                        <td>{email}</td>
                        <td>{role}</td>
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

export default LibrarianList;
