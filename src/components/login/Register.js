import React from 'react';
import { Link } from 'react-router-dom';

import './Styles.css'

export default function SignUpPage() {
  return (
    <div>
      <h2 className='heading'>Join us</h2>
      <h5 className='heading'>Create your personal account</h5>
      <form action="/home" className='form'>
        <p>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </p>
        <p>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </p>
        <p>
          <input type="checkbox" id="checkbox" name="checkbox" required />{' '}
          <span>
            I agree to all statements in{' '}
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
              terms of service
            </a>
            .
          </span>
        </p>
        <p className='text-center mt-3'>
          <button id="sub_btn" type="submit">Register</button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
