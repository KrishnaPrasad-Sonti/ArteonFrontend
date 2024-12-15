import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';  // Assuming Navbar is in the same folder
import './PageNotFound.css';    // CSS for the Page Not Found page
import brammi from '../assets/images/pig.jpg';

function PageNotFound() {
  return (
    <div>
      <Navbar /> {/* Common Navbar */}
      <div className="page-not-found">
        <img
          src={brammi}/* Placeholder for now */
          alt="404 Not Found"
          className="not-found-image"
        />
        <h1>Oops! Page Not Found</h1>
        <p>It seems the page you are looking for does not exist.</p>
        <Link to="/" className="home-link">Go back to Home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
