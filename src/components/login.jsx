import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate from React Router
import axios from 'axios';
import './login.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/Arteon/login`, {
        email: formData.email,
        password: formData.password
      });

      const user = response.data;
      console.log("User data:", user);

      if (user && user !== 'incorrect_credentials') {
        const userType = user.userType;

        console.log("User type:", user); 
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect with user data based on userType
        if (userType === '00') {
          navigate('/visitorhome', { state: { user } });
        } else if (userType === '01') {
          navigate('/curatorhome', { state: { user } });
        } else if (userType === '10') {
          navigate('/artisthome', { state: { user } });
        } else if (userType === '11') {
          navigate('/adminhome', { state: { user } });
        }
      } else {
        setError('Invalid credentials, please try again');
      }
    } catch (error) {
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-welcome">
        <h1>Welcome</h1>
        <h1>back</h1>
        <h1>to</h1>
        <h1>ARTEON</h1>
      </div>
      <div className="login-form-section">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your Email here" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Enter your Password" 
              required 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">LOGIN</button>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
