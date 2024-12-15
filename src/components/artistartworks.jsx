import React, { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const ArtistArtwork = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser); // Set the initial user from the prop
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    if (user?.id) {
      const fetchUserData = async () => {
        try {
          // API endpoint for fetching updated user data (adjust URL as needed)
          const response = await axios.get(`${apiUrl}/Arteon/artworks/user/${user.id}`);
          // Update the user object with the response from the backend
          setUser(response.data);
        } catch (err) {
          setError('Failed to fetch user data'); // Handle any errors
          console.error(err);
        }
      };

      fetchUserData();
    }
  }, [user?.id]); // Fetch only when the user's ID changes

  // Check if the user has galleryImagesMetadata
  const galleryImagesMetadata = user?.galleryImagesMetadata;

  const cardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const card = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    width: '250px',
    textAlign: 'center',
    backgroundColor: '#fff',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const infoStyle = {
    padding: '10px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#333',
    textAlign: 'left',
  };

  const formatDescription = (description) => {
    if (!description) return 'Description not available';
    const descriptionParts = description.split('|'); // Assuming `|` is used as a delimiter
    return descriptionParts.map((part, idx) => (
      <p key={idx} style={{ margin: '5px 0' }}>
        {part.trim()}
      </p>
    ));
  };

  if (error) {
    return <p>{error}</p>; // Display error if API call fails
  }

  return (
    <div className="artworks-container">
      <h2 style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
        My Artworks
      </h2>
      {user && galleryImagesMetadata ? (
        <div style={cardStyle}>
          {Object.entries(galleryImagesMetadata).map(([imageUrl, description], index) => (
            <div key={index} style={card}>
              <img
                src={imageUrl}
                alt={`Artwork ${index + 1}`}
                style={imageStyle}
              />
              <div style={infoStyle}>
                {formatDescription(description)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No artworks found.</p>
      )}
    </div>
  );
};

export default ArtistArtwork;
