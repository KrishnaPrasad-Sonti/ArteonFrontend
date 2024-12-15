import React from 'react';
import './aboutus.css';
import { FaPaintBrush, FaUserFriends, FaHistory, FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us">
      <div className="intro-section">
        <h1 className="about-title">About Arteon</h1>
        <p className="about-description">
          Welcome to Arteon, where <span className="highlight">creativity meets eternity</span>.
          Our art gallery combines the best of digital and physical exhibitions to bring timeless artistry to life.
          Discover pieces from talented artists worldwide that speak to the soul and open doors to endless possibilities.
        </p>
      </div>

      <div className="features-section">
        <div className="feature" style={{ '--feature-order': 1 }}>
          <FaPaintBrush className="feature-icon" />
          <h3>Creative Platform</h3>
          <p>Bringing modernity to classic art forms with inspiring, immersive experiences.</p>
        </div>
        <div className="feature" style={{ '--feature-order': 2 }}>
          <FaUserFriends className="feature-icon" />
          <h3>Community</h3>
          <p>Connecting artists, visitors, and enthusiasts in a vibrant community.</p>
        </div>
        <div className="feature" style={{ '--feature-order': 3 }}>
          <FaHistory className="feature-icon" />
          <h3>Culture & History</h3>
          <p>Celebrating the beauty of heritage through carefully curated collections.</p>
        </div>
        <div className="feature" style={{ '--feature-order': 4 }}>
          <FaLightbulb className="feature-icon" />
          <h3>Innovation</h3>
          <p>Leveraging technology to enhance the art-viewing experience.</p>
        </div>
      </div>

      <div className="call-to-action">
        <button className="explore-button" onClick={() => navigate('/exhibition')}>
          Explore Artworks
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
