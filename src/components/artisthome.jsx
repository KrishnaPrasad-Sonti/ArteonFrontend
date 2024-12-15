import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './artisthome.css';
import { FaSignOutAlt } from 'react-icons/fa';
import ArtistProfile from './artistprofile';
import SubmitArt from './submitartwork';
import ArtistArtwork from './artistartworks';

function ArtistHome() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // Track active section
  const [photoChanged, setPhotoChanged] = useState(false);
  const [artworkAdded, setArtUploadChange] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [profileUpdateMessage, setProfileUpdateMessage] = useState('');
  const navigate = useNavigate();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleNavClick = (section) => {
    setActiveSection(section); // Change active section
  };

  const handleCloseProfile = () => {
    setActiveSection(null); // Close profile form
  };

  const handleProfileSubmit = () => {
    setProfileUpdateMessage('Profile updated successfully!');
    setTimeout(() => setProfileUpdateMessage(''), 3000); // Clear message after 3 seconds
  };

  const handlePhotoChange = () => {
    setPhotoChanged(true);
  };

  const handleArtUploadChange = () => {
    setArtUploadChange(true);
  };

  const handlePasswordChange = () => {
    setPasswordChanged(true);
  };

  return (
    <div className="artisthome">
      <nav className='artisthomenav'>
        <h1>Arteon</h1>
        <button className="fab-sign-out" onClick={handleSignOut}>
          <FaSignOutAlt />
          <span className="signout-text">Sign Out</span> 
        </button>
      </nav>

      <div className="dashboard">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <a href="#myArtworks" onClick={() => handleNavClick('my-artworks')}>
              MY ARTWORKS
            </a>
          </li>
          <li>
            <a href="#uploadArtwork" onClick={() => handleNavClick('upload-artwork')}>
              UPLOAD ARTWORK
            </a>
          </li>
          <li>
            <a href="#artistprofile" onClick={() => handleNavClick('my-profile')}>
              MY PROFILE
            </a>
          </li>
        </ul>
      </div>

      <div className="main-frame">
        {user ? (
          <h2>{getGreeting()}, {user.username}!</h2>
        ) : (
          <h2>Loading...</h2>
        )}

        {profileUpdateMessage && <p className="success-message">{profileUpdateMessage}</p>}

        <div className={`section ${activeSection === 'upload-artwork' ? 'active' : ''}`}>
          {activeSection === 'upload-artwork' && (
            <SubmitArt
              user={user}
              onClose={handleCloseProfile}
              onUploadArtwork={handleArtUploadChange} // Correctly passing the function here
            />
          )}
        </div>

        <div className={`section ${activeSection === 'my-profile' ? 'active' : ''}`}>
          {activeSection === 'my-profile' && (
            <ArtistProfile
              user={user}
              onClose={handleCloseProfile}
              onProfileSubmit={handleProfileSubmit}
              onPhotoChange={handlePhotoChange}
              onPasswordChange={handlePasswordChange}
            />
          )}
        </div>

        <div className={`section ${activeSection === 'my-artworks' ? 'active' : ''}`}>
          {activeSection === 'my-artworks' && (
            <ArtistArtwork
              user={user} // Pass the user as a prop
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistHome;
