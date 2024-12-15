import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './visitorhome.css';
import VisitorProfile from './visitorprofile';
import ShowExhibitions from './showexhibitions';
import PaymentPage from './paymentpage';
import Visitorexhibition from './visitorexhibition';
import CartDisplay from './CartDisplay';

function VisitorHome() {

   const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState(null); // Track active section
    const [photoChanged, setPhotoChanged] = useState(false);
    const [artworkAdded, setArtUploadChange] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [profileUpdateMessage, setProfileUpdateMessage] = useState('');
    const navigate = useNavigate();
    

  // Function to get a dynamic greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    setActiveSection(section);
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
    <div className="visitor-home">
      <nav className='visitor-nav'>
              <h1>Arteon</h1>
              <button className="vfab-sign-out" onClick={handleSignOut}>
                <FaSignOutAlt />
                <span className="signout-text">Sign Out</span> 
              </button>
            </nav>

      <div className="visdashboard">
        <h2>Dashboard</h2>
        <ul>


        <li className={activeSection === 'exhibitions' ? 'active' : ''}>
            <a onClick={() => handleNavClick('exhibitions')}>
              Exhibitions
            </a>
          </li>
          
          <li className={activeSection === 'cart&payments' ? 'active' : ''}>
            <a onClick={() => handleNavClick('cart&payments')}>
              Cart & Payments
            </a>
          </li>
          
          
          <li className={activeSection === 'profile' ? 'active' : ''}>
            <a onClick={() => handleNavClick('profile')}>
              Update my profile 
            </a>
          </li>
        </ul>
      </div>

      <div className="main-frame">
      {user ? (
          <h2>{getGreeting()}, {user?.username || 'Admin'}!</h2>
        ) : (
          <h2>Loading...</h2>
        )}

        

        <div className={`section ${activeSection === 'cart&payments' ? 'active' : ''}`}>
          {activeSection === 'cart&payments' && <CartDisplay user={user} onClose={handleCloseProfile}/> }
        </div>

        <div className={`section ${activeSection === 'exhibitions' ? 'active' : ''}`}>
          {activeSection === 'exhibitions' && <Visitorexhibition  user={user}  onClose={handleCloseProfile}/> }
        </div>

        <div className={`section ${activeSection === 'profile' ? 'active' : ''}`}>
          {activeSection === 'profile' && <VisitorProfile
              user={user}
              onClose={handleCloseProfile}
              onProfileSubmit={handleProfileSubmit}
              onPhotoChange={handlePhotoChange}
              onPasswordChange={handlePasswordChange}
            />}
        </div>
      </div>
    </div>
  );
}

export default VisitorHome;
