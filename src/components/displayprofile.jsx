
function DisplayProfile({ profileUrl }) {
    // Default fallback image in case the URL is missing or invalid
    const defaultImage = 'https://res.cloudinary.com/dkpohryad/image/upload/v1733465925/defaultimg_tynill.png'; 
  
    // Check if the profileUrl exists, otherwise use the default fallback
    const imageUrl = profileUrl ? profileUrl : defaultImage;
  
    return (
      <div className="profile-picture-container">
        <img
          src={imageUrl}
          alt="Profile"
          className="profile-picture"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }} // Size adjustments
          onError={(e) => e.target.src = defaultImage} // Set fallback image if the original fails
        />
      </div>
    );
  }
  
  export default DisplayProfile;