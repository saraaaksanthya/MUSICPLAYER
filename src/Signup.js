import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = { name, email, password };

    try {
      // Update the URL to use your local IP address instead of localhost
      const res = await axios.post('http://localhost:5000/api/auth/register', newUser);
      if (res && res.data) {
        onLogin(res.data.token);
      } else {
        console.error('No data received in response:', res);
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.msg || 'Signup failed');
      } else if (err.request) {
        setErrorMessage('No response from server');
      } else {
        setErrorMessage('An error occurred');
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={onChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required className="form-input" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required className="form-input" />
      </div>
      <button type="submit" className="form-button">Sign Up</button>
      {errorMessage && (
        <p className="error-message">
          <span className="error-symbol">&#9888;</span> {errorMessage}
        </p>
      )}
    </form>
  );
};

export default Signup;
