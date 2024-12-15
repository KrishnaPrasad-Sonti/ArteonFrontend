import React, { useState } from 'react';
import './contactus.css';
import axios from 'axios';
import { motion } from "framer-motion";
const apiUrl = import.meta.env.VITE_API_URL;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/contactus/submit`, {
        email: formData.email,
        message: formData.message
      });
      setSuccess("Message sent successfully!");
      setError(null);
      setFormData({ email: '', message: '' });

      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    } catch (err) {
      setError(err.response ? err.response.data : "Error contacting, please try again.");
      setSuccess(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='mainsect'
    >
      <div className="contact-section">
        <h1>Contact Us</h1>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            required
          />

          <button className='msgsubmitbtn'type="submit">Send Message</button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactUs;
