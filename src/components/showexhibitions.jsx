import React, { useState, useEffect } from 'react';
import './showexhibitions.css';
const apiUrl = import.meta.env.VITE_API_URL;


const ShowExhibitions = ({onClose}) => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch exhibitions from backend
    fetch(`${apiUrl}/Arteon/Curator/exhibitions`)
      .then(response => response.json())
      .then(data => setExhibitions(data))
      .catch(error => console.error('Error fetching exhibitions:', error));
  }, []);

  const handleExhibitionClick = (exhibition) => {
    setSelectedExhibition(exhibition);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExhibition(null);
  };

  return (
    <div className="exhibitions-container">
       <button className="curatorclosebutton" onClick={onClose}>
        X
      </button>
      {/* Slider with exhibition details */}
      <div className="slider">
        {exhibitions.map((exhibition, index) => (
          <div
            key={exhibition.id}
            className="slider-card"
            onClick={() => handleExhibitionClick(exhibition)}
          >
            <h3>{exhibition.name}</h3>
            <p>{exhibition.startDate} - {exhibition.endDate}</p>
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
                  <img src={artwork.imageUrl} alt={artwork.description} />
                  <p>{artwork.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowExhibitions;
