import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/useAuth';
import { postCall } from '../helpers/postCall';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [message, setMessage] = useState({
    email: '',
    password: '',
  });

  const loginPic = '/images/login_library_chair.jpg';

  const handleLogin = (e) => {
    e.preventDefault();

    postCall('/api/auth', message).then((result) => {
      if (result['status'] === 200) {
        window.localStorage.setItem('id', result['data']['id']);
        window.localStorage.setItem('username', result['data']['username']);
        window.localStorage.setItem('role', result['data']['role']);
        window.localStorage.setItem('token', result['data']['token']);
        window.localStorage.setItem('expiry', result['data']['expiry']);

        login().then(() => {
          navigate('/');
        });
      } else {
        window.alert(result['data']['message']);
      }
    });
  };

  return (
    // make div behave like body, to use the bg-gradient-primary class
    <div className='bg-gradient-light' style={{ height: '100%', width: '100%', position: 'fixed' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-10 col-lg-12 col-md-9'>
            <div className='card o-hidden border-0 shadow-lg my-5'>
              <div className='card-body p-0'>
                <div className='row'>
                  <div
                    className='col-lg-6 d-none d-lg-block bg-common-page-image'
                    style={{
                      backgroundImage: `url(${process.env.PUBLIC_URL + loginPic})`,
                      minHeight: '500px',
                    }}
                  ></div>
                  <div className='col-lg-6'>
                    <div className='p-5'>
                      <div className='text-center pb-5'>
                        <h1 className='h4 text-gray-900 mb-4'>Login to BudLib</h1>
                      </div>
                      <form id='loginForm' className='user' onSubmit={handleLogin}>
                        <div className='form-group'>
                          <input
                            type='email'
                            id='email'
                            name='email'
                            className='form-control form-control-user'
                            maxLength='100'
                            value={message['email']}
                            required
                            placeholder='Enter Email Address...'
                            onChange={(e) => {
                              setMessage({ ...message, email: e.target.value });
                            }}
                          />
                        </div>
                        <div className='form-group pb-4'>
                          <input
                            type='password'
                            id='password'
                            name='password'
                            className='form-control form-control-user'
                            value={message['password']}
                            required
                            placeholder='Password'
                            onChange={(e) => {
                              setMessage({ ...message, password: e.target.value });
                            }}
                          />
                        </div>
                        <button type='submit' className='btn btn-primary btn-user btn-block'>
                          Login
                        </button>
                      </form>

                      <hr />

                      <div className='text-center'>
                        <a className='small' href='https://forms.gle/ws4trPgHjW7mtfmM8' target='_blank' rel='noopener noreferrer'>
                          Provide feedback
                        </a>
                      </div>
                      {/*<div className='text-center'>
                        <a className='small' href='#'>
                          Forgot Password?
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
