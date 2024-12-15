import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


const PaymentPage = ({ amount }) => {
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false); // Track if Razorpay is loaded
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userContact, setUserContact] = useState('');

  useEffect(() => {
    loadRazorpayScript()
      .then(() => {
        setRazorpayLoaded(true);
      })
      .catch((err) => {
        console.error("Error loading Razorpay script", err);
        setError("Failed to load Razorpay payment gateway.");
      });
  }, []);

  const createOrder = async () => {
    if (!userName || !userEmail || !userContact) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/orderpayment/create-order`, {
        amount: amount // Send the amount as a field inside the object
      });

      if (response.data.status === 'success') {
        setOrderId(response.data.orderId);
        initiatePayment(response.data.orderId, response.data.amount);
      }
    } catch (error) {
      console.error("Error creating order", error);
      setError("Failed to create the order. Please try again.");
    }
  };

  const initiatePayment = (orderId, amount) => {
    if (!razorpayLoaded) {
      alert("Razorpay script is not loaded.");
      return;
    }

    const options = {
      key: "rzp_test_P8uE7TxSe8Yt9B", // Your Razorpay Key ID
      amount: amount, // Amount in paise (100 = 1 INR)
      currency: "INR",
      name: "Arteon Art Gallery",
      description: "Payment for Artwork Purchase",
      order_id: orderId,
      handler: function(response) {
        alert("Payment successful: " + response.razorpay_payment_id);
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userContact
      },
      theme: {
        color: "#F37254"
      },
      payment_capture: 1, // Automatically capture payment after it's successful
      display: {
        // Add UPI, QR options (if supported in your region)
        method: "UPI"
      }
    };

    // Open Razorpay payment gateway
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  function loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      }
    });
  }

  return (
    <div>
      <h1>Payment Page</h1>
      {error && <div className="error">{error}</div>}

      <div>
        <p><strong>Amount: ₹{amount}</strong></p>
      </div>

      {/* Input fields for user details */}
      <div>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={userName}
          onChange={(e) => setUserName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Enter your contact number" 
          value={userContact}
          onChange={(e) => setUserContact(e.target.value)} 
        />
      </div>

      {/* Render button only if Razorpay script is loaded */}
      {razorpayLoaded ? (
        <button onClick={createOrder}>Pay Now</button>
      ) : (
        <p>Loading payment gateway...</p>
      )}
    </div>
  );
};

export default PaymentPage;
