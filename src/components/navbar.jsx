import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand">Arteon</div>
      <ul className="navbar-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/aboutus">ABOUT US</Link></li>
        <li><Link to="/contactus">CONTACT US</Link></li>
        <li><Link to="/exhibition">EXHIBITION</Link></li>
        <li><Link to="/signup">SIGN UP</Link></li>
        <li><Link to="/login">LOGIN</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
