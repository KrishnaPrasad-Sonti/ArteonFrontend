import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import ManageArts from './ManageArts'; // Ensure the correct file name here
import './curatorhome.css'
import ShowExhibitions from './showexhibitions';

function CuratorHome() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  // Function to get a dynamic greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser); // Use `storedUser` here, not `localStorage.getItem('user')`

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

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleCloseProfile = () => {
    setActiveSection(null); // Close profile form
  };

  return (
    <div className="curatorhome">
      <nav className='curatorhomenav'>
        <h1>Arteon</h1>
        <button className="cfab-sign-out" onClick={handleSignOut}>
        <span className="signout-text">Sign Out</span> 
          <FaSignOutAlt />
        </button>
      </nav>

      {/* Vertical Dashboard (Sidebar) */}
      <div className="cdashboard">
        <ul>
          <h1>Dashboard</h1>
          <li><a href="#manage-exhibition" onClick={() => handleSectionChange('manage-exhibition')}>Manage Existing Exhibition</a></li>
          <li><a href="#new-exhibition" onClick={() => handleSectionChange('new-exhibition')}>NEW EXHIBITION</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-frame">
        {user ? (
          <h2>{getGreeting()}, {user.username}!</h2>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>

      {/* Dynamically Render Sections */}
      <div className={`section ${activeSection === 'manage-exhibition' ? 'active' : ''}`}>
        {activeSection === 'manage-exhibition' && (
          // Add component for managing exhibitions (e.g., <ManageExhibition />)
          <ShowExhibitions onClose={handleCloseProfile}/>
        )}
      </div>

      <div className={`section ${activeSection === 'new-exhibition' ? 'active' : ''}`}>
        {activeSection === 'new-exhibition' && (
          <ManageArts user={user} onClose={handleCloseProfile} />
        )}
      </div>
    </div>
  );
}

export default CuratorHome;
