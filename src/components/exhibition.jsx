import React from 'react';
import './exhibition.css'
import art1 from '../assets/images/art2.jpg';
import art2 from '../assets/images/greenlake.png';
import art3 from '../assets/images/butterfly.png';


const exhibitions = [
  { id: 1, title: 'digital Paintings', venue: 'India', image: art1 },
  { id: 2, title: 'Oil Paintings', venue: 'India', image:art2 },
  { id: 3, title: 'Water Colour', venue: 'India', image: art3 },
];

const Exhibition = () => {
  return (
    <div className="exhibition-section">
      <h1>Current Exhibitions</h1>
      <div className="gallery">
        {exhibitions.map((exhibit) => (
          <div key={exhibit.id} className="gallery-item">
            <img src={exhibit.image} alt={exhibit.title} />
            <p>{exhibit.title} in {exhibit.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exhibition;
