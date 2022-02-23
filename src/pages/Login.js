import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { authed, login } = useAuth();

  const logicPic = 'images/login_library_chair.jpg';

  const handleLogin = () => {
    // calls api to verify login, stores jwt tokens here

    // carry on if successful
    login().then(() => {
      navigate('/');
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
                      backgroundImage: `url(${process.env.PUBLIC_URL + logicPic})`,
                    }}
                  ></div>
                  <div className='col-lg-6'>
                    <div className='p-5'>
                      <div className='text-center'>
                        <h1 className='h4 text-gray-900 mb-4'>Welcome Back!</h1>
                      </div>
                      <form className='user'>
                        <div className='form-group'>
                          <input type='email' className='form-control form-control-user' id='exampleInputEmail' aria-describedby='emailHelp' placeholder='Enter Email Address...' />
                        </div>
                        <div className='form-group'>
                          <input type='password' className='form-control form-control-user' id='exampleInputPassword' placeholder='Password' />
                        </div>
                        <div className='form-group'>
                          <div className='custom-control custom-checkbox small'>
                            <input type='checkbox' className='custom-control-input' id='customCheck' />
                            <label className='custom-control-label' htmlFor='customCheck'>
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button className='btn btn-primary btn-user btn-block' onClick={handleLogin}>
                          Login
                        </button>
                      </form>
                      <hr />
                      <div className='text-center'>
                        <a className='small' href='#'>
                          Forgot Password?
                        </a>
                      </div>
                      <div className='text-center'>
                        <a className='small' href='#'>
                          Create an Account!
                        </a>
                      </div>
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
