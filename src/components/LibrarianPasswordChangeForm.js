import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { putCall } from '../helpers/putCall';
import { useTranslation } from 'react-i18next';

const LibrarianEditForm = () => {
  const { t } = useTranslation('librarians');
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
      window.alert(t('passwordMismatch'));
      return;
    }

    putCall(librarianPasswordUrl, details).then((result) => {
      const status = result['status'];
      window.alert(t(
        [`passUpdateResp.${status}`, 'passUpdateResp.unspecific'],
        {errorMessage: result['data']['message']}
      ));

      if (status === 200) {
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
            {t('newPassword')}
            </label>
            <div className='col-sm-8'>
              <input
                type='password'
                className='form-control'
                id='formNewPassword'
                name='formNewPassword'
                placeholder={t('createPasswordPlaceholder')}
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
              <input 
                type='password' 
                className='form-control' 
                id='formConfirmPassword' 
                name='formConfirmPassword' 
                placeholder={t('confirmPasswordPlaceholder')}
                required
              />
            </div>
          </div>

          <button type='submit' className='btn btn-primary my-2'>
            {t('updatePassword')}
          </button>
          <button
            type='button'
            className='btn btn-outline-danger mx-4 my-2'
            onClick={() => {
              let path = `/dashboard/librarian/${id}/view`;
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

export default LibrarianEditForm;
