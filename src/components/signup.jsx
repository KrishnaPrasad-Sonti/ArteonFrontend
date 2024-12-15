import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
const apiUrl = import.meta.env.VITE_API_URL;

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post(`${apiUrl}/Arteon/signup`, {
        
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
  
      // Handle success
      setSuccess("User registered successfully!");
      setError(null);  // Reset error
      setFormData({ username: '', email: '', password: '', confirmPassword: '' }); // Clear form fields
  
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);  // Adjust delay as needed
  
    } 
    catch (err) {
      setError(err.response ? err.response.data : "Error signing up. Please try again.");
      setSuccess(null);  // Reset success
    }
  };


  return (
    <div className="signup-container">
      <div className="signup-welcome">
        <h1>Welcome</h1>
        <h1>to</h1>
        <h1>ARTEON</h1>
        <h1>Sign Up</h1>
      </div>

      <div className="signup-form-section">
        <h2 className="signup-heading">Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">UserName</label>
            <input
              type="text" id="username" name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Set your UserName"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email" id="email" name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password" name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password" id="confirmPassword" name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your Password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="signup-btn">SIGN UP</button>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>

      {/* Success Message Box (placed outside of the form) */}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
}

export default Signup;
