import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ContactPage = () => {
  const { showToast } = useApp();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! 👋 How can NovaStore VIP support assist you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    showToast('Your inquiry has been submitted! Support reference ticket #TKT-89421 created.', 'ri-checkbox-circle-fill');
    e.target.reset();
  };

  const handleSendChatMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Thank you for reaching out! Agent Sarah will connect with your session in 30 seconds.' }
      ]);
    }, 1000);
  };

  return (
    <div className="container contact-page-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Support & FAQ Center</span>
      </div>

      <div className="contact-header text-center">
        <h1>24/7 VIP Customer Support & FAQ Center</h1>
        <p>Have questions about express shipping, returns, order tracking, or flagship warranties? We're here to help.</p>
      </div>

      {/* 3 Top Contact Info Cards */}
      <div className="contact-info-cards">
        <div className="contact-info-card">
          <div className="contact-info-icon"><i className="ri-phone-fill"></i></div>
          <h3>Toll-Free Phone Support</h3>
          <p>+1 (800) 555-NOVA</p>
          <small className="text-muted">Mon–Sun: 24/7 Support</small>
        </div>

        <div className="contact-info-card">
          <div className="contact-info-icon"><i className="ri-mail-fill"></i></div>
          <h3>Official Email Care</h3>
          <p>support@novastore.com</p>
          <small className="text-muted">Fast response within 2 hours</small>
        </div>

        <div className="contact-info-card">
          <div className="contact-info-icon"><i className="ri-map-pin-fill"></i></div>
          <h3>Global Headquarters</h3>
          <p>742 Evergreen Terrace</p>
          <small className="text-muted">New York, NY 10001, USA</small>
        </div>
      </div>

      {/* 2-Column Grid: Form + FAQ Accordion */}
      <div className="contact-grid">
        <div className="contact-card">
          <h3><i className="ri-send-plane-fill"></i> Submit Support Inquiry Ticket</h3>
          <form onSubmit={handleSupportSubmit} className="form-group" style={{ gap: '14px' }}>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label>Order ID (Optional)</label>
              <input type="text" placeholder="e.g. #NOVA-89102" />
            </div>

            <div className="form-group">
              <label>Inquiry Subject *</label>
              <input type="text" placeholder="Order status, product specs, or return inquiry" required />
            </div>

            <div className="form-group">
              <label>Detailed Message *</label>
              <textarea rows="4" placeholder="Explain your query in detail..." required className="styled-textarea"></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              <i className="ri-send-plane-fill"></i> Submit Support Ticket
            </button>
          </form>
        </div>

        <div className="faq-card">
          <h3><i className="ri-questionnaire-line"></i> Frequently Asked Questions</h3>
          <div className="faq-list">
            <details className="faq-item" open>
              <summary>How fast is express shipping?</summary>
              <p>Standard express delivery takes 2–4 business days worldwide. Orders over $50 automatically qualify for 100% FREE express shipping.</p>
            </details>
            <details className="faq-item">
              <summary>What is your 30-day money-back return policy?</summary>
              <p>Return any item within 30 days of delivery in original condition for a full 100% refund. We provide free prepaid return labels.</p>
            </details>
            <details className="faq-item">
              <summary>Which payment options are accepted?</summary>
              <p>We support Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, UPI / QR Code, and Cash on Delivery (COD).</p>
            </details>
            <details className="faq-item">
              <summary>How do I redeem VIP promo coupons?</summary>
              <p>Apply promo codes like <strong>SPECIAL50</strong> or <strong>FLASH20</strong> on the Shopping Cart or Checkout page for instant discounts.</p>
            </details>
            <details className="faq-item">
              <summary>Are all products 100% authentic with manufacturer warranty?</summary>
              <p>Yes, 100% of NovaStore electronics, wearables, and equipment come directly from authorized brand partners with full official warranty coverage.</p>
            </details>
          </div>
        </div>
      </div>

      {/* Floating Live Chat Widget */}
      <div className={`live-chat-widget ${chatOpen ? 'open' : ''}`}>
        {!chatOpen ? (
          <button className="chat-trigger-btn" onClick={() => setChatOpen(true)}>
            <i className="ri-message-3-fill"></i> Live Support Chat
          </button>
        ) : (
          <div className="chat-window-card">
            <div className="chat-window-header">
              <div>
                <strong>NovaStore Live Assistant</strong>
                <small className="text-success" style={{ display: 'block' }}>● Agent Online</small>
              </div>
              <button className="close-chat-btn" onClick={() => setChatOpen(false)}>
                <i className="ri-close-line"></i>
              </button>
            </div>
            <div className="chat-window-body">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form className="chat-window-footer" onSubmit={handleSendChatMessage}>
              <input
                type="text"
                placeholder="Type your question..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary"><i className="ri-send-plane-2-fill"></i></button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
