import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/submitartwork.css';
const apiUrl = import.meta.env.VITE_API_URL;


const SubmitArt = ({ user, onClose, onUploadArtwork }) => {
  const [userId, setId] = useState(user?.id);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artType, setArtType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false); // New state to track image upload
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track form submission

  useEffect(() => {
    if (user?.id) {
      setId(user.id);
    }
  }, [user]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setErrorMessage('');
    setIsUploading(true); // Start the loading indicator

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB. Please upload a smaller file.');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ArteonArtistArt');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dkpohryad/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      const uploadedImageUrl = data.secure_url;
      setImageUrl(uploadedImageUrl);
      setIsUploading(false); // End the loading indicator
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Failed to upload image. Please try again.');
      setIsUploading(false); // End the loading indicator
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      setErrorMessage('Please wait for the image to finish uploading.');
      return;
    }

    const artDetails = `Title: ${title} | Price: $${price} | Artist: ${artistName} | Art Type: ${artType}`;

    const newArt = {
      userId,         
      artDetails,     
      imageUrl,       
    };

    setIsSubmitting(true); // Start the loading indicator for submission

    try {
      console.log("Submitting new artwork debug here request payload :", newArt);
      const result = await axios.post(`${apiUrl}/Arteon/submitart`, newArt);
      console.log("Backend response:", result);

      if (result.data.success) {
        setSuccessMessage('Art submitted successfully!');
        onUploadArtwork(newArt);  // Pass the new artwork data to the parent
        resetForm();
      } else {
        setErrorMessage('Failed to submit art. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting art:', error);
      setErrorMessage('Failed to submit art. Please try again.');
    } finally {
      setIsSubmitting(false); // End the loading indicator
    }
  };

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setArtistName('');
    setArtType('');
    setImageUrl('');
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="submit-art-form">
      <h3>Submit Your Artwork</h3>
      <button className="closebutton" onClick={onClose}>
        X
      </button>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title of Art:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Price in rupees:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            min="0" 
          />
        </div>

        <div className="form-group">
          <label>Artist Name:</label>
          <input 
            type="text" 
            value={artistName} 
            onChange={(e) => setArtistName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Type of Artwork:</label>
          <select 
            value={artType} 
            onChange={(e) => setArtType(e.target.value)} 
            required
          >
            <option value="">Select Art Type</option>
            <option value="Painting">Painting</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Photography">Photography</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Mixed Media">Mixed Media</option>
          </select>
        </div>

        <div className="form-group">
          <label>Artwork Image:</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} required />
          {isUploading && <p className="loading-message">Uploading image...</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          {imageUrl && <img src={imageUrl} alt="Artwork" width="200" />}
        </div>

        <button 
          className="submit-btn" 
          type="submit" 
          disabled={isUploading || isSubmitting} // Disable submit while image is uploading
        >
          {isSubmitting ? 'Submitting...' : 'Submit Art'}
        </button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default SubmitArt;
