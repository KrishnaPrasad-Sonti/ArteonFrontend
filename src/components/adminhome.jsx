import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminhome.css';
import { FaSignOutAlt } from 'react-icons/fa';
import AdminProfile from './adminprofile';               
import ManageUsers from './manageusers';

function AdminHome() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('manage-users');
  const [profileUpdateMessage, setProfileUpdateMessage] = useState(''); // State to hold the success message
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

  const handleCloseProfile = () => {
    setActiveSection(null);
  };

  const handleProfileSubmit = (updatedProfile) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedProfile }));
    setProfileUpdateMessage('Profile updated successfully!'); // Set the success message
  };

  const handlePhotoChange = () => {
    console.log('Photo changed');
  };

  const handlePasswordChange = () => {
    console.log('Password changed');
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="admin-home">
      <nav className='adminnav'>
        <h1>Arteon</h1>
        <button className="afab-sign-out" onClick={handleSignOut}>
                  <FaSignOutAlt />
                  <span className="signout-text">Sign Out</span> 
                </button>
      </nav>

      <div className="admindashboard">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <a href="#manageUsers" onClick={() => handleNavClick('manage-users')}>
              MANAGE USERS
            </a>
          </li>
         
        
          <li>
            <a href="#adminupdate" onClick={() => handleNavClick('admin-update')}>
              UPDATE MY DETAILS
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

        {/* Display Success Message */}
        {profileUpdateMessage && (
          <div className="success-message">{profileUpdateMessage}</div>
        )}

        <div className={`sction ${activeSection === 'admin-update' ? 'active' : ''}`}>
          {activeSection === 'admin-update' && (
            <AdminProfile
              user={user}
              onClose={handleCloseProfile}
              onProfileSubmit={handleProfileSubmit}
              onPhotoChange={handlePhotoChange}
              onPasswordChange={handlePasswordChange}
            />
          )}
        </div>

       

        <div className={`sction ${activeSection === 'manage-users' ? 'active' : ''}`}>
          {activeSection === 'manage-users' && <ManageUsers 
          onClose={handleCloseProfile}/>}
        </div>

        <div className={`sction ${activeSection === 'settings' ? 'active' : ''}`}>
          {activeSection === 'settings' && <div>Settings Content</div>}
        </div>
      </div>
    </div>
  );
}

export default  AdminHome; 