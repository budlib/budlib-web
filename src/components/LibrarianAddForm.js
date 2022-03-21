import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCall } from '../helpers/postCall';

const LibrarianAddForm = () => {
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'FACULTY',
  });

  function handleSubmit(e) {
    e.preventDefault();

    let password1 = document.getElementById('formCreatePassword').value;
    let password2 = document.getElementById('formConfirmPassword').value;

    if (password1 !== password2) {
      window.alert("Password don't match");
      return;
    }

    console.log(details);

    postCall('/api/librarian', details).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        navigate(`/librarian/search`);
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
                defaultValue='FACULTY'
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
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formUserName'>
              Username
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formUserName'
                name='formUserName'
                placeholder='johnrocks'
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
                placeholder='john.doe@waldorf.org'
                maxLength='100'
                required
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
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formCreatePassword'>
              Create password
            </label>
            <div className='col-sm-8'>
              <input
                type='password'
                className='form-control'
                id='formCreatePassword'
                name='formCreatePassword'
                placeholder='Enter a password'
                required
                value={details['password']}
                onChange={(e) => {
                  setDetails({ ...details, password: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formConfirmPassword'>
              Confirm password
            </label>
            <div className='col-sm-8'>
              <input type='password' className='form-control' id='formConfirmPassword' name='formConfirmPassword' placeholder='Confirm password' required />
            </div>
          </div>

          <button type='submit' className='btn btn-primary my-2'>
            Add Librarian
          </button>
          <button
            type='button'
            className='btn btn-outline-danger mx-4 my-2'
            onClick={() => {
              navigate(`/librarian/search`);
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
