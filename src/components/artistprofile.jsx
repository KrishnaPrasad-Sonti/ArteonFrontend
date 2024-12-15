import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './artistprofile.css';
const apiUrl = import.meta.env.VITE_API_URL;

const ArtistProfile = ({ user, onClose, onProfileSubmit, onPhotoChange, onPasswordChange }) => {
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
        const uploadedImageUrl = data.secure_url;
        setImageUrl(uploadedImageUrl);
        setProfilePhoto(uploadedImageUrl);
        onPhotoChange(); // Notify photo change
      })
      .catch((error) => {
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
      const result = await axios.post(`${apiUrl}/Arteon/artistprofileupdate`, updatedProfile, updatedProfile);
      if (result.data.success) {
        setSuccessMessage('Profile updated successfully!');
        onProfileSubmit(updatedProfile);
        if (newPassword) onPasswordChange(); // Notify password change
      } else {
        setErrorMessage('Failed to update profile. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="my-profile">
      <h3>My Profile</h3>
      <button className="close-button" onClick={onClose}>
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
          <input type="password" value={password} readOnly />
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
              maxLength="8"
              onChange={(e) => {
                const input = e.target.value;
                if (input.length <= 8) {
                  setNewPassword(input);
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

        <button className="profilesubmitbtn" type="submit">
          Save Changes
        </button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default ArtistProfile;
