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
      showToast('Please enter a valid Order ID', 'ri-alert-line');
      return;
    }
    setHasSearched(true);
    showToast(`Live status retrieved for ${orderIdInput}`, 'ri-truck-line');
  };

  return (
    <div className="container tracker-page-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Live Order Tracking</span>
      </div>

      <div className="tracker-header-box">
        <h1><i className="ri-radar-fill text-primary"></i> Live Order Tracking System</h1>
        <p>Enter your NovaStore tracking ID or receipt code below for instant GPS & logistics status updates.</p>
      </div>

      <div className="tracker-card">
        <form className="tracker-input-box" onSubmit={handleTrackSearch}>
          <div className="input-field-wrapper">
            <i className="ri-barcode-box-line tracker-input-icon"></i>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. #NOVA-98421)"
              value={orderIdInput}
              onChange={e => setOrderIdInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary tracker-submit-btn">
            <i className="ri-search-eye-line"></i> Track Order
          </button>
        </form>

        {hasSearched ? (
          <div className="tracker-results-wrapper">
            <div className="tracker-summary-header">
              <div>
                <span className="order-id-badge">{orderIdInput.toUpperCase()}</span>
                <span className="courier-badge"><i className="ri-plane-fill"></i> Express Air Courier</span>
              </div>
              <div className="eta-badge">
                <i className="ri-time-line"></i> Estimated Delivery: <strong>Tomorrow, 2:30 PM</strong>
              </div>
            </div>

            <div className="tracker-timeline">
              <div className="timeline-step completed">
                <div className="timeline-icon"><i className="ri-checkbox-circle-fill"></i></div>
                <div className="timeline-info">
                  <h4>Order Placed & Payment Verified</h4>
                  <p>Aug 22, 2026 - 10:15 AM | Payment processed via Secure Gateway</p>
                </div>
              </div>
              <div className="timeline-step completed">
                <div className="timeline-icon"><i className="ri-shield-check-fill"></i></div>
                <div className="timeline-info">
                  <h4>Quality Inspection & Package Sealed</h4>
                  <p>Aug 22, 2026 - 02:40 PM | Passed 12-point quality verification test</p>
                </div>
              </div>
              <div className="timeline-step active">
                <div className="timeline-icon"><i className="ri-truck-fill"></i></div>
                <div className="timeline-info">
                  <h4>In Transit - Express Air Logistics Hub</h4>
                  <p>Aug 22, 2026 - 06:10 PM | Departed Central Distribution Hub (Scanning Station #4)</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="timeline-icon"><i className="ri-map-pin-user-fill"></i></div>
                <div className="timeline-info">
                  <h4>Out for Delivery</h4>
                  <p>Assigned to courier agent for final step delivery</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="tracker-placeholder-info">
            <div className="tracker-demo-icon"><i className="ri-truck-line"></i></div>
            <h3>Real-Time Courier Tracking Activated</h3>
            <p>Try searching <strong>#NOVA-98421</strong> to see full shipment tracking details and timeline.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackPage;
