import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { putCall } from '../helpers/putCall';

const LibrarianEditForm = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  let librarianPasswordUrl = `/api/librarian/${id}/changepassword`;

  const [details, setDetails] = useState({
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();

    let password1 = document.getElementById('formNewPassword').value;
    let password2 = document.getElementById('formConfirmPassword').value;

    if (password1 !== password2) {
      window.alert("Password don't match");
      return;
    }

    putCall(librarianPasswordUrl, details).then((result) => {
      window.alert(result['data']['message']);

      if (result['status'] === 200) {
        let path = `/dashboard/librarian/${id}/view`;
        navigate(path);
      }
    });
  }

  return (
    <div className='card shadow mb-4 p-3 text-dark' style={{ maxWidth: '50rem' }}>
      <div className='card-body'>
        <form id='librarianPaswordForm' onSubmit={handleSubmit}>
          <div className='form-group row'>
            <label className='col-sm-4 col-form-label font-weight-bold' htmlFor='formNewPassword'>
              New password
            </label>
            <div className='col-sm-8'>
              <input
                type='password'
                className='form-control'
                id='formNewPassword'
                name='formNewPassword'
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
            Update Password
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
