import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';

const OfferModal = ({ isOpen, onClose }) => {
  const { applyCoupon } = useCart();
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const handleCopyAndClaim = () => {
    navigator.clipboard.writeText('SPECIAL50');
    applyCoupon('SPECIAL50');
    setCopied(true);
    showToast('50% OFF Coupon "SPECIAL50" Applied to Cart!', 'ri-gift-fill');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="offer-modal-overlay">
      <div className="offer-modal-card">
        {/* Close Button */}
        <button className="offer-close-btn" onClick={onClose} aria-label="Close VIP Offer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Offer Tag Badge */}
        <div className="offer-badge-glow">
          <i className="ri-flashlight-fill"></i> FLASH VIP OFFER
        </div>

        <h2>UNLOCK 50% OFF ENTIRE STORE</h2>
        <p className="offer-subtitle">
          Exclusive VIP Member Discount! Use code <strong>SPECIAL50</strong> at checkout to get 50% off on all flagship gear.
        </p>

        {/* Live Timer Clock */}
        <div className="offer-timer-box">
          <span className="offer-timer-title">Offer Expires In:</span>
          <div className="offer-timer-digits">
            <span className="timer-unit">{minutes}m</span> : <span className="timer-unit">{seconds}s</span>
          </div>
        </div>

        {/* Promo Code Action Container */}
        <div className="promo-code-container">
          <span className="promo-code-text">SPECIAL50</span>
          <button className="copy-promo-btn" onClick={handleCopyAndClaim}>
            {copied ? (
              <>
                <i className="ri-checkbox-circle-fill"></i> Applied!
              </>
            ) : (
              <>
                <i className="ri-file-copy-line"></i> Claim 50% OFF
              </>
            )}
          </button>
        </div>

        <small className="offer-footer-note">
          <i className="ri-shield-check-line"></i> Free Express Shipping included on orders over $50
        </small>
      </div>
    </div>
  );
};

export default OfferModal;
