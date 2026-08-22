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
        <button className="offer-close-btn" onClick={onClose} aria-label="Close Offer">
          <i className="ri-close-line"></i>
        </button>

        <div className="offer-badge-glow">
          <i className="ri-flashlight-fill"></i> FLASH VIP OFFER
        </div>

        <h2>UNLOCK 50% OFF ENTIRE STORE</h2>
        <p className="offer-subtitle">
          Exclusive VIP Member Discount! Use code <strong>SPECIAL50</strong> at checkout to get 50% off on all flagship gear.
        </p>

        {/* Live Timer */}
        <div className="offer-timer-box">
          <span>Offer Expires In:</span>
          <div className="offer-timer-digits">
            <span className="timer-unit">{minutes}m</span> : <span className="timer-unit">{seconds}s</span>
          </div>
        </div>

        {/* Promo Code Box */}
        <div className="promo-code-container">
          <span className="promo-code-text">SPECIAL50</span>
          <button className="copy-promo-btn" onClick={handleCopyAndClaim}>
            {copied ? <><i className="ri-check-line"></i> Applied!</> : <><i className="ri-file-copy-line"></i> Claim 50% OFF</>}
          </button>
        </div>

        <small className="offer-footer-note">
          <i className="ri-shield-check-line"></i> Free Shipping included for all orders above $50
        </small>
      </div>
    </div>
  );
};

export default OfferModal;
