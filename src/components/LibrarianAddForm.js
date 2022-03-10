import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCall } from '../helpers/postCall';

const LibrarianAddForm = () => {
  let navigate = useNavigate();

  const [details, setDetails] = useState({

    email: '',
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  function handleSubmit(e) {
    e.preventDefault();

    postCall('/api/librarian', details).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        setDetails({

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
    let path = `/librarian`;
              navigate(path);
  }

  return (
    <div className='card shadow mb-4 p-3 text-dark' style={{ maxWidth: '50rem' }}>
      <div className='card-body'>
        <form id='loanerForm' onSubmit={handleSubmit}>

          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formSchoolId'>
              User Name
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formSchoolId'
                name='formSchoolId'
                placeholder='XJKDKS'
                maxLength='250'
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
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formFatherName'>
              Temporary Password
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formFatherName'
                name='formFatherName'
                placeholder='password'
                maxLength='250'
                value={details['password']}
                onChange={(e) => {
                  setDetails({ ...details, password: e.target.value });
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
                id='formMotherName'
                name='formMotherName'
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
            Add Librarian
          </button>
          <button
            type='button'
            className='btn btn-outline-danger mx-4 my-2'
            onClick={() => {
              let path = `/librarian`;
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

export default LibrarianAddForm;
