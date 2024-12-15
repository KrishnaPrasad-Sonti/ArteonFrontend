import React, { useState, useEffect } from 'react';
import './managearts.css'
const apiUrl = import.meta.env.VITE_API_URL ;

const ManageArts = ({ user, onClose }) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [exhibitionDetails, setExhibitionDetails] = useState({
    exhibitionName: '',
    startDate: '',
    endDate: ''
  });
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  // Fetch artists when component mounts
  useEffect(() => {
    fetch(`${apiUrl}/Arteon/Curator/artists`)
      .then(response => response.json())
      .then(data => setArtists(data))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  // Fetch gallery images of the selected artist
  useEffect(() => {
    if (selectedArtistId) {
      const selectedArtist = artists.find(artist => artist.id === Number(selectedArtistId));
      if (selectedArtist && selectedArtist.galleryImagesMetadata) {
        const images = Object.entries(selectedArtist.galleryImagesMetadata);
        setGalleryImages(images);
      }
    }
  }, [selectedArtistId, artists]);

  // Handle image card selection
  const handleCardClick = (imageUrl, description) => {
    const artistName = description.split('|').find(part => part.includes('Artist:')).split(':')[1].trim();

    setSelectedImages(prevSelectedImages => {
      const isImageAlreadySelected = prevSelectedImages.some(image => image.imageUrl === imageUrl);
      if (isImageAlreadySelected) {
        return prevSelectedImages.filter(image => image.imageUrl !== imageUrl);
      } else {
        return [...prevSelectedImages, { imageUrl, description, artistName }];
      }
    });
  };

  // Check if the image is selected
  const isImageSelected = (imageUrl) =>
    selectedImages.some(image => image.imageUrl === imageUrl);

  // Handle changes in exhibition input fields
  const handleExhibitionInputChange = (e) => {
    const { name, value } = e.target;
    setExhibitionDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Submit the exhibition data
  const handleSubmit = () => {
    const selectedImagesInfo = selectedImages.map(image => ({
      imageUrl: image.imageUrl,
      description: image.description,
      artistName: image.artistName
    }));

    const exhibitionData = {
      name: exhibitionDetails.exhibitionName,
      startDate: exhibitionDetails.startDate,
      endDate: exhibitionDetails.endDate,
      artworkDetails: selectedImagesInfo
    };

    console.log('Exhibition Data:', exhibitionData);

    fetch(`${apiUrl}/Arteon/Curator/create-exhibition`, {
      method: 'POST',
      body: JSON.stringify(exhibitionData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Exhibition created successfully', data);
        setSuccessMessage('Exhibition created successfully!'); // Show success message
        setTimeout(() => setSuccessMessage(''), 5000); // Hide message after 5 seconds
      })
      .catch(error => {
        console.error('Error creating exhibition:', error);
        setSuccessMessage('Failed to create exhibition. Please try again.');
        setTimeout(() => setSuccessMessage(''), 5000); // Hide error message after 5 seconds
      });
  };

  return (
    <div>
      <h1>Create New Exhibition</h1>

      <button className="curatorclosebutton" onClick={onClose}>
        X
      </button>

      <div>
        <label htmlFor="exhibitionName">Exhibition Name:</label>
        <input
          type="text"
          id="exhibitionName"
          name="exhibitionName"
          value={exhibitionDetails.exhibitionName}
          onChange={handleExhibitionInputChange}
          placeholder="Enter exhibition name"
        />
      </div>

      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={exhibitionDetails.startDate}
          onChange={handleExhibitionInputChange}
        />
      </div>

      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={exhibitionDetails.endDate}
          onChange={handleExhibitionInputChange}
        />
      </div>

      <h2>Select an Artist</h2>
      <select onChange={(e) => setSelectedArtistId(Number(e.target.value))}>
        <option value="">Select an artist</option>
        {artists.map(artist => (
          <option key={artist.id} value={artist.id}>
            {artist.username}
          </option>
        ))}
      </select>

      <h2>Gallery</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {galleryImages.map(([imageUrl, description]) => (
          <div
            key={imageUrl}
            onClick={() => handleCardClick(imageUrl, description)}
            style={{
              border: isImageSelected(imageUrl) ? '3px solid #4CAF50' : '1px solid #ddd',
              padding: '10px',
              width: '200px',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: isImageSelected(imageUrl) ? '#f0fdf4' : '#fff'
            }}
          >
            <img
              src={imageUrl}
              alt="Artwork"
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <p>{description}</p>

            {isImageSelected(imageUrl) && (
              <span
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  padding: '5px 8px',
                  borderRadius: '50%'
                }}
              >
                ✔️
              </span>
            )}
          </div>
        ))}
      </div>

      <h2>Selected Images for Exhibition</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {selectedImages.map((image) => (
          <div key={image.imageUrl} style={{ border: '2px solid #4CAF50', padding: '10px', width: '200px' }}>
            <img
              src={image.imageUrl}
              alt="Selected Artwork"
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <p>{image.description}</p>
            <p><strong>Artist:</strong> {image.artistName}</p>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>Submit Exhibition</button>

      {/* Display Success/Error Message */}
      {successMessage && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: successMessage.startsWith('Exhibition') ? '#4CAF50' : '#f44336', color: 'white' }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ManageArts;
