import React, { useState, useEffect } from 'react';
import './showexhibitions.css';
const apiUrl = import.meta.env.VITE_API_URL;


const Visitorexhibition = ({ user ,onClose}) => {
  const [exhibitions, setExhibitions] = useState([]);
  const [userId, setId] = useState(user?.id || null);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState(new Set()); // Using Set for efficient selection
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exhibitions on component mount
  useEffect(() => {
    fetch(`${apiUrl}/Arteon/Curator/exhibitions`)
      .then(response => response.json())
      .then(data => {
        setExhibitions(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching exhibitions.');
        setLoading(false);
      });
  }, []);

  // Update userId whenever the user prop changes
  useEffect(() => {
    if (user?.id) {
      setId(user.id);
    }
  }, [user]);

  // Handle exhibition card click
  const handleExhibitionClick = (exhibition) => {
    setSelectedExhibition(exhibition);
    setSelectedArtworks(new Set()); // Reset selected artworks
    setShowModal(true);
  };

  // Close the exhibition modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedExhibition(null);
  };

  // Handle artwork selection (add/remove from selected artworks)
  const handleArtworkSelect = (artworkId) => {
    setSelectedArtworks(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(artworkId)) {
        newSelection.delete(artworkId);
      } else {
        newSelection.add(artworkId);
      }
      return newSelection;
    });
  };

  // Handle Add to Cart action
  const handleAddToCart = () => {
    // Convert selectedArtworks (Set) to an array
    const selectedArtworksArray = Array.from(selectedArtworks);

    if (selectedArtworksArray.length === 0) {
      alert('Please select at least one artwork to add to the cart.');
      return;
    }

    // Get the details of selected artworks by matching IDs
    const selectedArtworkDetails = selectedExhibition.artworkDetails.filter(artwork =>
      selectedArtworksArray.includes(artwork.id)
    );

    // Extract image URLs from the selected artworks
    const imageUrls = selectedArtworkDetails.map(artwork => artwork.imageUrl);

    // Send image URLs and userId to the backend
    console.log('sendint the data is ',{imageUrls},'user id is ',userId);
    fetch(`${apiUrl}/Arteon/Visitor/addcart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrls, userId }) // Send object containing imageUrls and userId
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error adding to cart');
      }
      return response.json();
    })
    .then(data => {
      alert(data.message);  // Assuming the backend sends a message in `data.message`
      console.log('Cart response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert(error.message);
    });
  };

  return (
    <div className="exhibitions-container">
      <button className="visclosebutton" onClick={onClose}>
        X
      </button>
      {loading && <p>Loading exhibitions...</p>}
      {error && <p>{error}</p>}

      {/* Slider with exhibition details */}
      <div className="slider">
        {exhibitions.map((exhibition) => (
          <div
            key={exhibition.id}
            className="slider-card"
            onClick={() => handleExhibitionClick(exhibition)}
          >
            <h3>{exhibition.name}</h3>
            <p>Start date: {exhibition.startDate} <br /> End date: {exhibition.endDate}</p>
          </div>
        ))}
      </div>

      {/* Modal with glassmorphism */}
      {showModal && selectedExhibition && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>X</button>
            <h2>{selectedExhibition.name}</h2>
            <p>{selectedExhibition.startDate} - {selectedExhibition.endDate}</p>

            <div className="gallery">
              {selectedExhibition.artworkDetails.map((artwork) => (
                <div key={artwork.id} className="art-card">
                  <input 
                    type="checkbox" 
                    className="select-checkbox"
                    checked={selectedArtworks.has(artwork.id)} 
                    onChange={() => handleArtworkSelect(artwork.id)} 
                  />
                  <img src={artwork.imageUrl} alt={artwork.description} />
                  <p>{artwork.description}</p>
                </div>
              ))}
            </div>

            <button 
              className="add-to-cart-button" 
              onClick={handleAddToCart} 
              disabled={selectedArtworks.size === 0 || !userId} // Disable if no items are selected or userId is not available
            >
              Add to Cart ({selectedArtworks.size})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitorexhibition;
