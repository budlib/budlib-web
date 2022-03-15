import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../helpers/useFetch';
import { putCall } from '../helpers/putCall';

const LoanEditForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  let loanerDetailUrl = `/api/loaners/${id}`;
  const { loading: loadStatus, data: existingDetails } = useFetch(loanerDetailUrl);

  const [details, setDetails] = useState({
    schoolId: '',
    email: '',
    salutation: '',
    firstName: '',
    middleName: '',
    lastName: '',
    motherName: '',
    fatherName: '',
    isStudent: '',
  });

  useEffect(() => {
    setDetails({
      schoolId: existingDetails['schoolId'] || '',
      email: existingDetails['email'] || '',
      salutation: existingDetails['salutation'] || '',
      firstName: existingDetails['firstName'] || '',
      middleName: existingDetails['middleName'] || '',
      lastName: existingDetails['lastName'] || '',
      motherName: existingDetails['motherName'] || '',
      fatherName: existingDetails['fatherName'] || '',
      isStudent: existingDetails['isStudent'],
    });

    if (existingDetails['isStudent'] === true) {
      document.getElementById('formSalutation').parentElement.parentElement.classList.add('bg-hide');
      document.getElementById('formFatherName').parentElement.parentElement.classList.remove('bg-hide');
      document.getElementById('formMotherName').parentElement.parentElement.classList.remove('bg-hide');
    } else {
      document.getElementById('formSalutation').parentElement.parentElement.classList.remove('bg-hide');
      document.getElementById('formFatherName').parentElement.parentElement.classList.add('bg-hide');
      document.getElementById('formMotherName').parentElement.parentElement.classList.add('bg-hide');
    }
  }, [loadStatus]);

  function handleSubmit(e) {
    e.preventDefault();

    putCall(loanerDetailUrl, details).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        let path = `/loaners/${id}/view`;
        navigate(path);
      }
    });
  }

  return (
    <div className='card shadow mb-4 p-3 text-dark' style={{ maxWidth: '50rem' }}>
      <div className='card-body'>
        <form id='loanerForm' onSubmit={handleSubmit}>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLoanerType'>
              Loaner Type
            </label>
            <div className='col-sm-8'>
              <select
                className='form-control'
                id='formLoanerType'
                name='formLoanerType'
                value={details['isStudent'] === true ? 'Student' : 'Faculty'}
                onChange={(e) => {
                  setDetails({ ...details, isStudent: e.target.value === 'Student' ? true : false });

                  document.getElementById('formSalutation').parentElement.parentElement.classList.toggle('bg-hide');
                  document.getElementById('formFatherName').parentElement.parentElement.classList.toggle('bg-hide');
                  document.getElementById('formMotherName').parentElement.parentElement.classList.toggle('bg-hide');

                  let idLabel = document.getElementById('formSchoolId').parentElement.previousElementSibling;
                  e.target.value === 'Student' ? (idLabel.innerHTML = 'School ID') : (idLabel.innerHTML = 'Employee ID');
                }}
              >
                <option value='Student'>Student</option>
                <option value='Faculty'>Faculty</option>
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formSchoolId'>
              School ID
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
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formSalutation'>
              Salutation
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formSalutation'
                name='formSalutation'
                list='salutationList'
                placeholder='Mr'
                maxLength='250'
                value={details['salutation']}
                onChange={(e) => {
                  setDetails({ ...details, salutation: e.target.value });
                }}
              />
              <datalist id='salutationList'>
                <option value='Mr'></option>
                <option value='Ms'></option>
                <option value='Miss'></option>
                <option value='Mrs'></option>
                <option value='Dr'></option>
              </datalist>
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
              Father's name
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formFatherName'
                name='formFatherName'
                placeholder='Michael Jake Doe'
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
              Mother's name
            </label>
            <div className='col-sm-8'>
              <input
                type='text'
                className='form-control'
                id='formMotherName'
                name='formMotherName'
                placeholder='Emily Doe'
                maxLength='250'
                value={details['motherName']}
                onChange={(e) => {
                  setDetails({ ...details, motherName: e.target.value });
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

export default LoanEditForm;
