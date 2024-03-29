import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../context/noteContext';
import './Login.css';

const Login = () => {
  const context = useContext(noteContext);
  const { showAlert } = context;
  const history = useHistory();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch('https://inotebook-server-two.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      // Redirect
      localStorage.setItem('token', json.authToken);
      history.push('/');
      showAlert('Logged In', 'success');
    } else {
      showAlert('Invalid Credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid login-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4 signup-heading">Log In</h2>
              <form onSubmit={handleClick}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    onChange={onChange}
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    name="email"
                    value={credentials.email}
                    required
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={onChange}
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block underline">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
