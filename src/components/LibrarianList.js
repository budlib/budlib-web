import React from 'react';
import { useFetch } from '../helpers/useFetch';
import { Link } from 'react-router-dom';

const LibrarianList = (props) => {
  const thisurl = '/api/librarian';
  const { data } = useFetch(thisurl);

  return (
    <div className='row'>
      <div className='col-lg-10'>
        <div className='card shadow mb-4'>
          <div className='card-body'>
            <div className='table-responsive'>
              {data.length === 1 ? (
                'No other librarians found'
              ) : (
                <table className='table table-bordered table-hover' id='dataTable' width='100%' cellSpacing='0'>
                  <thead className='table-secondary text-dark'>
                    <tr>
                      <th>Librarian ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((dataItem) => {
                      let { librarianId, userName, email, role } = dataItem;

                      if (librarianId.toString() !== window.localStorage.getItem('id')) {
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
                            <td>{email}</td>
                            <td>{role}</td>
                          </tr>
                        );
                      }
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

export default LibrarianList;
