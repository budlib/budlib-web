import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { putCall } from '../helpers/putCall';

const LibrarianEditForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  let librarianDetailUrl = `/api/librarian/${id}`;
  const { loading: loadStatus, data: existingDetails } = useFetch(librarianDetailUrl);

  const [details, setDetails] = useState({
    librarianId: '',
    email: '',
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
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
      email: existingDetails['email'] || '',
      password: existingDetails['password'] || '',
      role: existingDetails['role'] || '',
    });
  }, [loadStatus]);

  function handleSubmit(e) {
    e.preventDefault();

    putCall(librarianDetailUrl, details).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        setDetails({
          librarianId: '',
          email: '',
          userName: '',
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          password: '',
          role: '',
        });
      }
    });
    navigate('/librarian')

  }

  return (
    <div className='card shadow mb-4 p-3 text-dark' style={{ maxWidth: '50rem' }}>
      <div className='card-body'>
        <form id='loanerForm' onSubmit={handleSubmit}>

          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formSchoolId'>
              {"Librarian ID" + details['librarianId']}
            </label>

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
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formFirstName'>
              User Name
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

          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formMotherName'>
              Role
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formrole'
                name='formrole'
                placeholder='admin'
                maxLength='250'
                value={details['role']}
                onChange={(e) => {
                  setDetails({ ...details, role: e.target.value });
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
              let path = `/home`;
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
