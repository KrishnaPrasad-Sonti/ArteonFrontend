import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faInstagram, faPinterest, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        {/* Logo and Social Links */}
        <div>
          <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem" }}>Arteon</h2><br></br>
          <div className="footer-socials">
          <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGoogle} size="2x" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faPinterest} size="2x" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          </div>
        </div>

        {/* Solutions Section */}
        <div>
          <h4>Categories</h4>
          <ul>
            <li><a href="#">Artists</a></li>
            <li><a href="#">Pintings</a></li>
            <li><a href="#">Sculpture</a></li>
            <li><a href="#">Traditional Arts</a></li>
            <li><a href="#">Exhibitions</a></li>
          </ul>
        </div>

        {/* Our Cities Section */}
        <div>
          <h4>Exhibitions</h4>
          <ul>
            <li><a href="#">Louvre Museum</a></li>
            <li><a href="#">Metropolitan Museum of Art</a></li>
            <li><a href="#">The British Museum</a></li>
            <li><a href="#">The Guggenheim</a></li>
            <li><a href="#">Rijksmuseum</a></li>
            <li><a href="#">Museum of Modern Art(MoMA)</a></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="#">For Residents</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2024 Arteon. All rights reserved.</span>
        <div>
          <a href="#">Terms</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;