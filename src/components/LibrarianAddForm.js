import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCall } from '../helpers/postCall';
import { useTranslation } from 'react-i18next';

const LibrarianAddForm = () => {
  const { t } = useTranslation('librarians');
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
      window.alert(t('passwordMismatch'));
      return;
    }

    postCall('/api/librarian', details).then((result) => {
      const status = result['status'];
      window.alert(t(
        [`createResp.${status}`, 'createResp.unspecific'],
        {errorMessage: result['data']['message']}
      ));

      if (status === 200) {
        navigate(`/dashboard/librarian/search`);
      }
    });
  }

  return (
    <div className='card shadow mb-4 p-3 text-dark' style={{ maxWidth: '50rem' }}>
      <div className='card-body'>
        <form id='librarianForm' onSubmit={handleSubmit}>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLibrarianType'>
              {t('role')}
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
                <option value='ADMIN'>{t('ADMIN')}</option>
                <option value='FACULTY'>{t('FACULTY')}</option>
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formUserName'>
              {t('username')}
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
              {t('email')}
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
              {t('firstName')}
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
              {t('middleName')}
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
              {t('lastName')}
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
              {t('createPassword')}
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
              {t('confirmPassword')}
            </label>
            <div className='col-sm-8'>
              <input type='password' className='form-control' id='formConfirmPassword' name='formConfirmPassword' placeholder='Confirm password' required />
            </div>
          </div>

          <button type='submit' className='btn btn-primary my-2'>
            {t('add')}
          </button>
          <button
            type='button'
            className='btn btn-outline-danger mx-4 my-2'
            onClick={() => {
              navigate(`/dashboard/librarian/search`);
            }}
          >
            {t('cancel')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LibrarianAddForm;
