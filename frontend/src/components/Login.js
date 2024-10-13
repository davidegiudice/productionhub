import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api'; // Adjust import path as needed
import './Login.css'; // Assuming the CSS file you created earlier

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await registerUser({ email, password });
        setIsRegister(false); // Registration successful, move to login
      } else {
        const response = await loginUser({ email, password });
        localStorage.setItem('token', response.data.token);
        // Redirect user or update UI to indicate login success
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegister ? 'Register' : 'Sign in with email'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {isRegister ? 'Register' : 'Get Started'}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          {isRegister
            ? 'Already have an account? '
            : "Don't have an account? "}
          <span
            className="toggle-register-login"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login here' : 'Register here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
