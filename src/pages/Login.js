import { useNavigate } from "react-router-dom";

import {useAuth} from '../helpers/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const {authed, login } = useAuth();

  const handleLogin = () => {
    //calls api to verify login, stores jwt tokens here


    //////////carry on if successful
    login().then(() => {

      navigate("/");
    });
  };

  return (
    <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-title">
                            Sign in to your account
                        </div>

                        <div className="login-form">

                            <form>
                                <div className="form-group">
                                    <label className="form-control-label" >Username</label>
                                    <input type="text" className="form-control" onChange={(e) => this.getUsername(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Password</label>
                                    <input type="password" className="form-control" onChange={(e) => this.getPassword(e)} />
                                </div>

                                <div >
                                  <button onClick={handleLogin}>Log in</button>


                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>

  );
};
export default Login;