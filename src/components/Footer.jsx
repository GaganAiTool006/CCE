import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { showToast } = useApp();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    showToast('Subscribed to VIP deal alerts!', 'ri-checkbox-circle-fill');
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <Link to="/" className="brand-logo">
            <div className="logo-icon"><i className="ri-flashlight-fill"></i></div>
            <span className="logo-text">Nova<span className="highlight">Store</span></span>
          </Link>
          <p>Your premier destination for flagship electronics, cyber wear, gaming gear, and modern smart living tech.</p>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><i className="ri-twitter-x-line"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="ri-instagram-line"></i></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Github"><i className="ri-github-line"></i></a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord"><i className="ri-discord-line"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Navigation</h4>
          <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/shop">Shop Catalog</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/wishlist">Saved Wishlist</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/track">Track Order</Link></li>
            <li><Link to="/contact">Support Center</Link></li>
            <li><Link to="/contact">FAQs & Policies</Link></li>
            <li><Link to="/login">Account Login</Link></li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h4>Stay Connected</h4>
          <p>Subscribe to get exclusive flash deal alerts and VIP coupons directly in your inbox.</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input type="email" placeholder="Enter your email address..." required />
            <button type="submit" className="btn btn-primary"><i className="ri-send-plane-fill"></i></button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p>© 2026 NovaStore Inc. All rights reserved. Built with React & Vanilla CSS.</p>
          <div className="payment-badges">
            <i className="ri-visa-fill"></i>
            <i className="ri-mastercard-fill"></i>
            <i className="ri-paypal-fill"></i>
            <i className="ri-qr-code-line"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
