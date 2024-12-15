import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


const AdminProfile = ({ user, onClose, onProfileSubmit, onPhotoChange, onPasswordChange }) => {
  const [userId, setId] = useState(user?.id);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [photourl, setProfilePhoto] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user?.id) {
      setId(user.id);
    }
  }, [user]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setErrorMessage('');

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB. Please upload a smaller file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'UserProfilePhoto-upload');

    fetch('https://api.cloudinary.com/v1_1/dkpohryad/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const uploadedImageUrl = data.secure_url;
        setImageUrl(uploadedImageUrl);
        setProfilePhoto(uploadedImageUrl);
        onPhotoChange(); // Notify photo change
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setErrorMessage('Failed to upload image. Please try again.');
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      userId,
      username,
      email,
      password: newPassword || password,
      photourl,
    };
 
    try {
        console.log("Submitting updated profile:", updatedProfile);
        const result = await axios.post(`${apiUrl}/Arteon/artistprofileupdate`, updatedProfile);
        console.log("Backend response:", result);
    
        if (result.data.success) {
          // If the response indicates success
          setSuccessMessage(result.data.message);  // Use the message from the response
          onProfileSubmit(updatedProfile);
          if (newPassword) onPasswordChange(); // Notify password change
        } else {
          // If there's an error in the response
          setErrorMessage('Failed to update profile. Please try again.');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        setErrorMessage('Failed to update profile. Please try again.');
      }
    };

  return (
    <div className="my-profile">
      <h3>My Profile</h3>       
      <button className="adminclosebutton" onClick={onClose}>
        X
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} disabled />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} disabled />
        </div>
        
        <div className="form-group">
          <label>Current Password:</label>
          <input 
            type="password" 
            value={password} 
            readOnly 
          />
          <button type="button" onClick={() => setShowPasswordField(!showPasswordField)}>
            {showPasswordField ? 'Cancel Change' : 'Change Password'}
          </button>
        </div>
        {showPasswordField && (
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              placeholder="Enter exactly 8 characters"
              maxLength="8" // Ensure the input cannot exceed 8 characters
              onChange={(e) => {
                const input = e.target.value;
                if (input.length <= 8) {
                  setNewPassword(input); // Update state only if length is within limit
                }
              }}
            />
            {newPassword && newPassword.length !== 8 && (
              <p className="error">Password must be exactly 8 characters long.</p>
            )}
          </div>
        )}

        <div className="form-group">
          <label>Profile Photo:</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {errorMessage && <p className="error">{errorMessage}</p>}
          {imageUrl && <img src={imageUrl} alt="Profile" width="200" />}
        </div>

        <button className='profilesubmitbtn' type="submit">Save Changes</button>
      </form>

      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Error Message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default AdminProfile;
