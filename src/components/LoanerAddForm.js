import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCall } from '../helpers/postCall';
import { useTranslation } from 'react-i18next';

const LoanAddForm = () => {
  const { t } = useTranslation('loaners');
  let navigate = useNavigate();

  const [details, setDetails] = useState({
    schoolId: '',
    email: '',
    salutation: '',
    firstName: '',
    middleName: '',
    lastName: '',
    motherName: '',
    fatherName: '',
    isStudent: true,
  });

  function handleSubmit(e) {
    e.preventDefault();

    postCall('/api/loaners', details).then((result) => {
      const status = result['status'];
      window.alert(t(
        [`createResp.${status}`, 'createResp.unspecific'],
        {errorMessage: result['data']['message']}
      ));

      if (result['status'] === 200) {
        window.location.reload();
      }
    });
  }

  return (
    <div className='card shadow mb-4 p-3 text-dark' style={{ maxWidth: '50rem' }}>
      <div className='card-body'>
        <form id='loanerForm' onSubmit={handleSubmit}>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLoanerType'>
              {t('loanerType')}
            </label>
            <div className='col-sm-8'>
              <select
                className='form-control'
                id='formLoanerType'
                name='formLoanerType'
                defaultValue='Student'
                onChange={(e) => {
                  setDetails({ ...details, isStudent: e.target.value === 'Student' ? true : false });

                  document.getElementById('formSalutation').parentElement.parentElement.classList.toggle('bg-hide');
                  document.getElementById('formFatherName').parentElement.parentElement.classList.toggle('bg-hide');
                  document.getElementById('formMotherName').parentElement.parentElement.classList.toggle('bg-hide');

                  let idLabel = document.getElementById('formSchoolId').parentElement.previousElementSibling;
                  e.target.value === 'Student' ? (idLabel.textContent = t('schoolId')) : (idLabel.textContent = t('employeeId'));
                }}
              >
                <option value='Student'>{t('student')}</option>
                <option value='Faculty'>{t('faculty')}</option>
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formSchoolId'>
              {t('schoolId')}
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formSchoolId'
                name='formSchoolId'
                placeholder='XJKDKS'
                maxLength='250'
                value={details['schoolId']}
                onChange={(e) => {
                  setDetails({ ...details, schoolId: e.target.value });
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
                placeholder={t('emailPlaceholder')}
                maxLength='250'
                value={details['email']}
                onChange={(e) => {
                  setDetails({ ...details, email: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='form-group row bg-hide'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formSalutation'>
              {t('salutation')}
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formSalutation'
                name='formSalutation'
                list='salutationList'
                placeholder={t('mr')}
                maxLength='250'
                value={details['salutation']}
                onChange={(e) => {
                  setDetails({ ...details, salutation: e.target.value });
                }}
              />
              <datalist id='salutationList'>
                <option value={t('mr')}></option>
                <option value={t('ms')}></option>
                <option value={t('miss')}></option>
                <option value={t('mrs')}></option>
                <option value={t('dr')}></option>
              </datalist>
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
                placeholder={t('firstNamePlaceholder')}
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
                placeholder={t('middleNamePlaceholder')}
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
                placeholder={t('lastNamePlaceholder')}
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
              {t('fatherName')}
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formFatherName'
                name='formFatherName'
                placeholder={t('fatherNamePlaceholder')}
                maxLength='250'
                value={details['fatherName']}
                onChange={(e) => {
                  setDetails({ ...details, fatherName: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formMotherName'>
              {t('motherName')}
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formMotherName'
                name='formMotherName'
                placeholder={t('motherNamePlaceholder')}
                maxLength='250'
                value={details['motherName']}
                onChange={(e) => {
                  setDetails({ ...details, motherName: e.target.value });
                }}
              />
            </div>
          </div>

          <button type='submit' className='btn btn-primary my-2'>
            {t('add')}
          </button>
          <button
            type='button'
            className='btn btn-outline-danger mx-4 my-2'
            onClick={() => {
              let path = `/home`;
              navigate(path);
            }}
          >
            {t('cancel')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanAddForm;
