import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles.css';

export default function SignInPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/users', formData);
    
      navigate('/dashboard', { state: { username: formData.username } }); // Pass username as state to the dashboard
    } catch (error) {
      alert('Error while logging in');
    }

    setFormData({ username: '', password: '' });
  };

  return (
    <div>
      <h2 className='heading'>Sign in to us</h2>
      <form className='form' onSubmit={handleLogin}>
        <p>
          <label htmlFor="username">Username or email address</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Link to="/forget-password">
            <span className="right-label">Forget password?</span>
          </Link>
        </p>
        <p className='text-center mt-4'>
          <button className='btn btn-primary' type="submit">Login</button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
      </footer>
    </div>
  );
}
