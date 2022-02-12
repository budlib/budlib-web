import React from 'react';
import { Link } from 'react-router-dom';

const LoanAddForm = () => {
  const handleSubmit = () => {
    console.log('You pressed submit button');
  };

  function handleTypeChange(event) {
    console.log(event);
  }

  return (
    <div className='card shadow mb-4 text-dark' style={{ maxWidth: '50rem' }}>
      <div className='card-body'>
        <form>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLoanerType'>
              Loaner Type
            </label>
            {/* change structure of form based on this */}
            <div className='col-sm-8'>
              <select name='formLoanerType' className='form-control' id='formLoanerType' onChange={handleTypeChange}>
                <option value='Student' selected>
                  Student
                </option>
                <option value='Faculty'>Faculty</option>
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formSchoolId'>
              School ID
            </label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' placeholder='XJKDKS' />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formEmployeeId'>
              Employee ID
            </label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' placeholder='XJKDKS' />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formSchoolId'>
              Salutation
            </label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' list='salutationList' placeholder='Mr' />
              <datalist id='salutationList'>
                <option value='Mr'></option>
                <option value='Ms'></option>
                <option value='Miss'></option>
                <option value='Mrs'></option>
                <option value='Doc'></option>
              </datalist>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formFirstName'>
              First name
            </label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' placeholder='John' />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formMiddleName'>
              Middle name
            </label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' placeholder='Michael' />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formLastName'>
              Last name
            </label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' placeholder='Doe' />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formFatherName'>
              Father's name
            </label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' placeholder='Michael Jake Doe' />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formMotherName'>
              Mother's name
            </label>
            <div className='col-sm-8'>
              <input type='text' className='form-control' placeholder='Emily Doe' />
            </div>
          </div>

          <button type='submit' className='btn btn-primary m-3'>
            Add loaner
          </button>
          <button type='button' className='btn btn-outline-danger m-3'>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanAddForm;
