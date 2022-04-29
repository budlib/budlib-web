import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { putCall } from '../helpers/putCall';
import { useFetch } from '../helpers/useFetch';

const LibrarianEditForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  let loggedId = window.localStorage.getItem('id');

  let librarianDetailUrl = `/api/librarian/${id}`;
  const { loading: loadStatus, data: existingDetails } = useFetch(librarianDetailUrl);

  const [details, setDetails] = useState({
    librarianId: '',
    email: '',
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    role: '',
  });

  useEffect(() => {
    setDetails({
      librarianId: existingDetails['librarianId'] || '',
      email: existingDetails['email'] || '',
      userName: existingDetails['userName'] || '',
      firstName: existingDetails['firstName'] || '',
      middleName: existingDetails['middleName'] || '',
      lastName: existingDetails['lastName'] || '',
      role: existingDetails['role'] || '',
    });
  }, [loadStatus]);

  function handleSubmit(e) {
    e.preventDefault();

    putCall(librarianDetailUrl, details).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        if (id === loggedId) {
          window.localStorage.setItem('role', details['role']);
          window.localStorage.setItem('username', details['userName']);
        }

        let path = `/dashboard/librarian/${id}/view`;
        navigate(path);
      }
    });
  }

  return (
    <div className='card shadow mb-4 p-3 text-dark' style={{ maxWidth: '50rem' }}>
      <div className='card-body'>
        <form id='librarianForm' onSubmit={handleSubmit}>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLibrarianType'>
              Role
            </label>
            <div className='col-sm-8'>
              <select
                className='form-control'
                id='formLibrarianType'
                name='formLibrarianType'
                value={details['role']}
                onChange={(e) => {
                  setDetails({ ...details, role: e.target.value });
                }}
              >
                <option value='ADMIN'>ADMIN</option>
                <option value='FACULTY'>FACULTY</option>
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formFirstName'>
              Username
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formuserName'
                name='formuserName'
                placeholder='John'
                maxLength='250'
                required
                value={details['userName']}
                onChange={(e) => {
                  setDetails({ ...details, userName: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formEmail'>
              Email
            </label>
            <div className='col-sm-8'>
              <input
                type='email'
                className='form-control'
                id='formEmail'
                name='formEmail'
                placeholder='john.doe@waldorf.ca'
                maxLength='250'
                value={details['email']}
                onChange={(e) => {
                  setDetails({ ...details, email: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formFirstName'>
              First name
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formFirstName'
                name='formFirstName'
                placeholder='John'
                maxLength='250'
                required
                value={details['firstName']}
                onChange={(e) => {
                  setDetails({ ...details, firstName: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formMiddleName'>
              Middle name
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formMiddleName'
                name='formMiddleName'
                placeholder='Michael'
                maxLength='250'
                value={details['middleName']}
                onChange={(e) => {
                  setDetails({ ...details, middleName: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLastName'>
              Last name
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formLastName'
                name='formLastName'
                placeholder='Doe'
                maxLength='250'
                value={details['lastName']}
                onChange={(e) => {
                  setDetails({ ...details, lastName: e.target.value });
                }}
              />
            </div>
          </div>

          <button type='submit' className='btn btn-primary my-2'>
            Update
          </button>
          <button
            type='button'
            className='btn btn-outline-danger mx-4 my-2'
            onClick={() => {
              let path = `/dashboard/librarian/${id}/view`;
              navigate(path);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LibrarianEditForm;
