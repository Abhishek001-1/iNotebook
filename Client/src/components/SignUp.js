import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../context/noteContext';
import './SignUp.css'; // Import your custom styles

const SignUp = () => {
  const context = useContext(noteContext);
  const { showAlert } = context;
  const history = useHistory();
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      // Redirect
      localStorage.setItem('token', json.authToken);
      history.push('/');
      showAlert('Registered', 'success');
    } else {
      showAlert('Invalid Credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid signup-container my-4">
      <div className="row justify-content-center my-4">
        <div className="col-md-6 col-lg-4 my-4">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4 signup-heading">Sign Up</h2>
              <form onSubmit={handleClick}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
