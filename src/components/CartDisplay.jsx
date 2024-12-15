import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cartdisplay.css';
import PaymentPage from './paymentpage';  // Import PaymentPage component
const apiUrl = import.meta.env.VITE_API_URL;

const CartDisplay = ({ user , onClose}) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false); // State to show payment modal
  const [price, setPrice] = useState(null); // State to hold the selected price

  useEffect(() => {
    if (!user || !user.id) return;

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Arteon/Visitor/getcart/${user.id}`);
        setCartItems(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cart items');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleBuyClick = (price) => {
    setPrice(price); // Set the selected price
    setShowPayment(true); // Show the PaymentPage modal
  };

  const handleClosePayment = () => {
    setShowPayment(false); // Close the modal
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cartcontainer">
      <h2>Your Cart</h2>
      <button className="visclosebutton" onClick={onClose}>
        X
      </button>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cartitems">
          {cartItems.map((item) => (
            <div className="cartitemcard" key={item.imageUrl}>
              <img src={item.imageUrl} alt={item.description} className="cartitemimage" />
              <div className="cartitemdescription">
                <p>{item.description}</p>
                <p><strong>Price: ${item.price}</strong></p>
              </div>
              <button onClick={() => handleBuyClick(item.price)} className="buy-button">Buy</button>
            </div>
          ))}
        </div>
      )}

      {showPayment && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <span className="close-button" onClick={handleClosePayment}>&times;</span>
            <PaymentPage amount={price} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDisplay;
