import React, { useState } from 'react';

const ArtistArt = ({ onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the file from the input
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'UserProfilePhoto-upload');  // Use your preset name

    fetch('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const uploadedImageUrl = data.secure_url;
        setImageUrl(uploadedImageUrl);
        onImageUpload(uploadedImageUrl); // Send the URL back to the parent form
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {imageUrl && <img src={imageUrl} alt="Profile" width="200" />}
    </div>
  );
};

export default ArtistArt;
