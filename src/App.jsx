import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import HeroSection from './components/herosection';
import SignUp from './components/signup';
import Login from './components/login';
import PageNotFound from './components/pagenotfound';
import Exhibition from './components/exhibition';
import ContactUs from './components/contactus';
import AboutUs from './components/aboutus';
import AdminHome from './components/adminhome';
import CuratorHome from './components/curatorhome';
import VisitorHome from './components/visitorhome';
import ArtistHome from './components/artisthome';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';



function NavbarWrapper() {
  const location = useLocation();

  // Define routes where Navbar should be shown
  const showNavbar = [
    '/signup',
    '/login',
    '/aboutus',
    '/exhibition',
    '/contactus',
    '/'
  ].includes(location.pathname);

  return showNavbar ? <Navbar /> : null;
}
function FooterWrapper() {
  const location = useLocation();

  // Define routes where Navbar should be shown
  const showFooter = [
    
    '/aboutus',
    '/exhibition',
    '/contactus',
    '/signup',
    '/login',
    '/'
  ].includes(location.pathname);

  return showFooter? <Footer/> : null;
}


function App() {
  

  return (
    <Router>
      <div>
        <ScrollToTop/>
        {/* Render Navbar conditionally */}
        <NavbarWrapper />

        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Admin and other specific routes */}
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/curatorhome" element={<CuratorHome />} />
          <Route path="/artisthome" element={<ArtistHome />} />
          <Route path="/visitorhome" element={<VisitorHome />} />
        </Routes>

        {/* Render Footer at the bottom of the page */}
        <FooterWrapper/>
      </div>
    </Router>
  );
}

export default App;
