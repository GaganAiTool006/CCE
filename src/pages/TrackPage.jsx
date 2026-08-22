import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const TrackPage = () => {
  const { showToast } = useApp();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrackSearch = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      showToast('Please enter an Order ID', 'ri-alert-line');
      return;
    }
    setHasSearched(true);
    showToast(`Order status retrieved for ${orderIdInput}`, 'ri-truck-line');
  };

  return (
    <div className="container tracker-page-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Track Order</span>
      </div>
      <h1>Live Order Tracking System</h1>
      <p>Enter your NovaStore order ID to view real-time shipping status and delivery updates.</p>

      <div className="tracker-card">
        <form className="tracker-input-box" onSubmit={handleTrackSearch}>
          <input
            type="text"
            placeholder="Enter Order ID (e.g. #NOVA-98421)"
            value={orderIdInput}
            onChange={e => setOrderIdInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <i className="ri-search-line"></i> Track Status
          </button>
        </form>

        {hasSearched && (
          <div className="tracker-timeline">
            <div className="timeline-step completed">
              <div className="timeline-icon"><i className="ri-shopping-cart-check-line"></i></div>
              <div className="timeline-info">
                <h4>Order Placed</h4>
                <p>Order received & payment confirmed.</p>
              </div>
            </div>
            <div className="timeline-step active">
              <div className="timeline-icon"><i className="ri-box-3-line"></i></div>
              <div className="timeline-info">
                <h4>Processing & Quality Check</h4>
                <p>Items being verified & securely packaged.</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="timeline-icon"><i className="ri-flight-takeoff-line"></i></div>
              <div className="timeline-info">
                <h4>Dispatched / In Transit</h4>
                <p>Handed over to courier express service.</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="timeline-icon"><i className="ri-home-smile-line"></i></div>
              <div className="timeline-info">
                <h4>Out for Delivery</h4>
                <p>Delivery agent assigned to your destination.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackPage;
