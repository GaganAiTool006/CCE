import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';

const CheckoutPage = () => {
  const { cart, totalUSD, clearCart, addOrder } = useCart();
  const { formatPrice, lang, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [paymentMode, setPaymentMode] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace',
    city: 'New York',
    zip: '10001'
  });

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `#NOVA-${Math.floor(10000 + Math.random() * 90000)}`;
      
      const newOrder = {
        orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Processing',
        items: [...cart],
        totalUSD,
        shippingInfo
      };

      addOrder(newOrder);
      clearCart();
      showToast('Order Placed Successfully!', 'ri-checkbox-circle-fill');
      
      navigate('/order-success', { state: newOrder });
    }, 1600);
  };

  return (
    <div className="container checkout-page-container">
      <div className="checkout-header">
        <h1>Checkout Wizard</h1>
        <div className="checkout-steps">
          <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-text">Shipping Address</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-text">Payment Method</span>
          </div>
          <div className="step-line"></div>
          <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-text">Final Review</span>
          </div>
        </div>
      </div>

      <div className="checkout-page-card">
        {step === 1 && (
          <form onSubmit={handleShippingSubmit}>
            <h3><i className="ri-map-pin-line"></i> Shipping Address Details</h3>
            <div className="form-grid" style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" value={shippingInfo.name} onChange={e => setShippingInfo({...shippingInfo, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" value={shippingInfo.email} onChange={e => setShippingInfo({...shippingInfo, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" value={shippingInfo.phone} onChange={e => setShippingInfo({...shippingInfo, phone: e.target.value})} required />
              </div>
              <div className="form-group full-width">
                <label>Street Address *</label>
                <input type="text" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input type="text" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Postal Code *</label>
                <input type="text" value={shippingInfo.zip} onChange={e => setShippingInfo({...shippingInfo, zip: e.target.value})} required />
              </div>
            </div>
            <div className="checkout-actions">
              <div></div>
              <button type="submit" className="btn btn-primary">
                Continue to Payment <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <h3><i className="ri-bank-card-line"></i> Payment Option</h3>
            <div className="payment-tabs" style={{ marginTop: '16px' }}>
              <button className={`pay-tab ${paymentMode==='card'?'active':''}`} onClick={() => setPaymentMode('card')}>
                <i className="ri-credit-card-line"></i> Credit / Debit Card
              </button>
              <button className={`pay-tab ${paymentMode==='upi'?'active':''}`} onClick={() => setPaymentMode('upi')}>
                <i className="ri-qr-code-line"></i> UPI / QR Code
              </button>
              <button className={`pay-tab ${paymentMode==='cod'?'active':''}`} onClick={() => setPaymentMode('cod')}>
                <i className="ri-hand-coin-line"></i> Cash on Delivery
              </button>
            </div>

            {paymentMode === 'card' && (
              <div className="form-grid" style={{ marginTop: '16px' }}>
                <div className="form-group full-width">
                  <label>Card Number</label>
                  <input type="text" placeholder="4532 •••• •••• 8892" defaultValue="4532 8892 1092 8892" />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" defaultValue="12/28" />
                </div>
                <div className="form-group">
                  <label>CVV / CVC</label>
                  <input type="password" placeholder="•••" defaultValue="882" />
                </div>
              </div>
            )}

            {paymentMode === 'upi' && (
              <div className="qr-code-box" style={{ marginTop: '16px' }}>
                <div className="qr-placeholder"><i className="ri-qr-code-fill"></i></div>
                <p>Scan with Google Pay, PhonePe, Paytm, or BHIM UPI</p>
                <small className="text-muted">Or enter VPA: novastore@upi</small>
              </div>
            )}

            {paymentMode === 'cod' && (
              <div className="info-alert" style={{ marginTop: '16px' }}>
                <i className="ri-information-line"></i>
                <p>Pay cash when package is delivered to your doorstep.</p>
              </div>
            )}

            <div className="checkout-actions">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                <i className="ri-arrow-left-line"></i> Back
              </button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>
                Review Order <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3><i className="ri-checkbox-circle-line"></i> Final Order Review</h3>

            <div className="review-grid" style={{ margin: '16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="review-box" style={{ background: 'var(--bg-glass)', padding: '14px', borderRadius: '8px' }}>
                <h4>Shipping Address</h4>
                <p><strong>{shippingInfo.name}</strong><br />{shippingInfo.address}, {shippingInfo.city} {shippingInfo.zip}</p>
              </div>
              <div className="review-box" style={{ background: 'var(--bg-glass)', padding: '14px', borderRadius: '8px' }}>
                <h4>Payment Option</h4>
                <p>{paymentMode === 'card' ? 'Credit / Debit Card' : paymentMode === 'upi' ? 'UPI / QR Code' : 'Cash on Delivery'}</p>
              </div>
            </div>

            <div className="review-items-list" style={{ margin: '16px 0' }}>
              {cart.map(item => (
                <div key={item.id} className="summary-row" style={{ padding: '6px 0' }}>
                  <span>{item.title[lang] || item.title.en} (x{item.quantity})</span>
                  <strong>{formatPrice(item.priceUSD * item.quantity)}</strong>
                </div>
              ))}
            </div>

            <div className="summary-row total-row">
              <span>Total Amount Payable:</span>
              <strong className="total-price">{formatPrice(totalUSD)}</strong>
            </div>

            <div className="checkout-actions">
              <button className="btn btn-secondary" onClick={() => setStep(2)}>
                <i className="ri-arrow-left-line"></i> Back
              </button>
              <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                {isProcessing ? <><i className="ri-loader-4-line ri-spin"></i> Processing...</> : <><i className="ri-lock-line"></i> Pay & Confirm Order</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
