import React, { useEffect, useState } from 'react';
import './manageusers.css';
import DisplayProfile from './displayprofile';
const apiUrl = import.meta.env.VITE_API_URL;


function ManageUsers({ onClose }) {
  const [roleCounts, setRoleCounts] = useState({
    Admins: 0,
    Artists: 0,
    Curators: 0,
    Visitors: 0,
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [clickedCard, setClickedCard] = useState(null); // Track clicked card for zoom
  const [users, setUsers] = useState([]); // Store the list of users
  const [loadingUsers, setLoadingUsers] = useState(false); // Loading state for users
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Controls delete pop-up
  const [userToDelete, setUserToDelete] = useState(null); 

  // Fetch the role counts from the backend
  useEffect(() => {
    fetch(`${apiUrl}/Arteon/roleCounts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched role counts:', data);
        setRoleCounts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching role counts:', error);
        setError('Failed to fetch role counts');
        setLoading(false);
      });
  }, []);

  // Fetch users when a card is clicked
  useEffect(() => {
    if (clickedCard) {
      setLoadingUsers(true); // Start loading users for the selected role
      fetch(`${apiUrl}/Arteon/users/${clickedCard}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Fetched users:', data);
          setUsers(data);
          setLoadingUsers(false); // Stop loading after users are fetched
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          setError('Failed to fetch users');
          setLoadingUsers(false);
        });
    }
  }, [clickedCard]); // Trigger when clickedCard changes

  if (loading) {
    return <div className="loading-message">Loading role counts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleCardClick = (role) => {
    setClickedCard(role); // Set clicked card when a card is clicked
  };

  const handleRoleChange = (userId, newRole) => {
    console.log(`Role for user ${userId} changed to ${newRole}`);

    // Update the user's role in the UI immediately
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, userType: newRole } : user
      )
    );
  };

  const getRoleName = (userType) => {
    const roleMap = {
      '11': 'Admin',
      '10': 'Artist',
      '01': 'Curator',
      '00': 'Visitor',
    };
    return roleMap[userType] || 'Unknown';
  };

  const getRemainingRoles = (currentRole) => {
    const allRoles = ['Admin', 'Artist', 'Curator', 'Visitor'];
    return allRoles.filter((role) => role !== currentRole);
  };

  const handleForceUpdate = (user) => {
    // Map binary userType to string roles
    const userTypeToRole = {
      '11': 'Admin',
      '10': 'Artist',
      '01': 'Curator',
      '00': 'Visitor',
    };
  
    // Convert the binary userType to the corresponding role string
    const roleString = userTypeToRole[user.userType] || 'Unknown';
  
    // Create the user data object including the updated userType as a role string
    const updatedUser = {
      id: user.id,
      userType: roleString, // Use the string representation of the role
    };
  
    // Send the updated user data to the backend
    fetch(`${apiUrl}/Arteon/userupdation`, {
      method: 'PUT', // Use PUT for updating resources
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser), // Convert the object to a JSON string
    })
      .then((response) => response.json()) // Assuming the response is JSON
      .then((data) => {
        if (data.success) {
          // Update the UI immediately by replacing the user data
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
        } else {
          // Handle error from backend if necessary
          console.error('Failed to update user:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };
  const confirmDelete = () => {
    if (!userToDelete) return;

    fetch(`${apiUrl}/Arteon/userdeletion/${userToDelete.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete user');
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
        setShowDeletePopup(false);
        setUserToDelete(null);
        location.reload();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        setShowDeletePopup(false);
      });
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user); // Store the user to delete
    setShowDeletePopup(true); // Show the confirmation pop-up
  };

  
  
  return (
    <div className="manage-users-container">
      <button className="adminclosebutton" onClick={onClose}>
        X
      </button>
      <h3 className="manage-users-heading">Manage Users</h3>
      <div className="main-content">
        {/* Role Cards */}
        <div className="role-counts-container">
          <div
            className={`admincard ${clickedCard === 'Admins' ? 'zoom-effect' : ''}`}
            onClick={() => handleCardClick('Admins')}
          >
            <h4 className="role-title">Admins</h4>
            <p className="role-count">{roleCounts.Admins}</p>
          </div>
        
          <div
            className={`artistcard ${clickedCard === 'Artists' ? 'zoom-effect' : ''}`}
            onClick={() => handleCardClick('Artists')}
          >
            <h4 className="role-title">Artists</h4>
            <p className="role-count">{roleCounts.Artists}</p>
          </div>
          <div
            className={`curatorcard ${clickedCard === 'Curators' ? 'zoom-effect' : ''}`}
            onClick={() => handleCardClick('Curators')}
          >
            <h4 className="role-title">Curators</h4>
            <p className="role-count">{roleCounts.Curators}</p>
          </div>
          <div
            className={`visitorcard ${clickedCard === 'Visitors' ? 'zoom-effect' : ''}`}
            onClick={() => handleCardClick('Visitors')}
          >
            <h4 className="role-title">Visitors</h4>
            <p className="role-count">{roleCounts.Visitors}</p>
          </div>
        </div>

        {/* Displaying Users for the Selected Role */}
        {clickedCard && (
          <div className="user-list-container">
            {loadingUsers ? (
              <div className="loading-users-message">Loading users...</div>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th className="table-header">Email</th>
                    <th className="table-header">Profile Picture</th>
                    <th className="table-header">Change Role</th>
                    <th className="table-header">Force Update</th>
                    <th className="table-header">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => {
                      const currentRole = getRoleName(user.userType);
                      const remainingRoles = getRemainingRoles(currentRole);

                      return (
                        <tr key={user.id}>
                          <td className="table-cell">{user.email}</td>
                          <td className="table-cell">
                            <DisplayProfile profileUrl={user.profilePhotoUrl} />
                          </td>
                         
                          <td className="table-cell">
                            <select
                              className="role-select"
                              value={user.userType} // Use the internal userType for the value
                              onChange={(e) => handleRoleChange(user.id, e.target.value)} // Pass the selected value
                            >
                              {/* Create the option for the current role */}
                              <option value={user.userType}>{getRoleName(user.userType)}</option>
                              
                              {/* Dynamically create the remaining roles */}
                              {remainingRoles.map((role) => {
                                // Convert role to its corresponding userType string
                                const roleToUserType = {
                                  'Admin': '11',
                                  'Artist': '10',
                                  'Curator': '01',
                                  'Visitor': '00',
                                };
                                return (
                                  <option key={role} value={roleToUserType[role]}>
                                    {role}
                                  </option>
                                );
                              })}
                            </select>
                          </td>

                          <td className="table-cell">
                            <button className="force-update-btn" onClick={() => handleForceUpdate(user)}>Force Update</button>
                          </td>
                          <td className="table-cell">
                          <button className='delete-btn' onClick={() => handleDeleteClick(user)}>Delete</button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}



{showDeletePopup && (
        <div className="delete-popup">
          <div className="popup-content">
            <h3>Are you sure you want to delete this user?</h3>
            <p>User Email: {userToDelete?.email}</p>
            <button onClick={confirmDelete} className="yes-btn">Yes</button>
            <button onClick={cancelDelete} className="no-btn">No</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default ManageUsers;
