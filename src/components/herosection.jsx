import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import people from '../assets/images/3people.png';
import './herosection.css';

function HeroSection() {
  const [animatePage, setAnimatePage] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Trigger the animation when the component mounts
    setAnimatePage(true);
  }, []);

  const handleExploreArt = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className={`hero-section ${animatePage ? 'animate-page' : ''}`}>
      {/* Hero Image Section */}
      <div className="hero-image">
        <img src={people} alt="Artwork" />
      </div>

      {/* Hero Text Section */}
      <div className="hero-text">
        <h2>Arteon - Where Art Meets "Eternity"</h2>
        <div className="exhibitbutn">
          <button className="hbtn-login" onClick={handleExploreArt}>
            Explore Art
          </button>
        </div>
      </div>

      {/* Additional Section - Features or Information */}
      <div className="hero-info">
        <div className="info-title">
          <h3>Discover the Timeless Beauty of Art</h3>
        </div>
        <div className="info-text">
          <p>
            Arteon combines the best of digital and physical exhibitions, bringing artwork from around the world into your hands.
            With immersive technology and a diverse community of artists, the experience is both unique and captivating.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <h3>Join the Movement</h3>
        <p>Be part of our growing community of art enthusiasts. Share your passion, discover new artists, and make your mark in the world of art.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
}

export default HeroSection;
