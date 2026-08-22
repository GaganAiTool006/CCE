import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { formatPrice } = useApp();

  const orderData = location.state || {
    orderId: '#NOVA-98421',
    totalUSD: 299.99,
    date: new Date().toLocaleDateString(),
    shippingInfo: { name: 'Alex Rivera', email: 'alex@example.com' }
  };

  return (
    <div className="container receipt-page-container">
      <div className="success-icon-wrapper">
        <i className="ri-checkbox-circle-fill success-icon"></i>
      </div>
      <h2>Order Placed Successfully!</h2>
      <p className="order-id-badge">Order ID: <strong>{orderData.orderId}</strong></p>
      <p className="success-message">
        Thank you for shopping with NovaStore, {orderData.shippingInfo?.name}! A confirmation receipt has been sent to <strong>{orderData.shippingInfo?.email}</strong>.
      </p>

      <div className="receipt-card">
        <div className="receipt-header">
          <span>NovaStore Official Receipt</span>
          <span>{orderData.date}</span>
        </div>
        <div className="receipt-total-row">
          <span>Total Paid Amount:</span>
          <strong>{formatPrice(orderData.totalUSD)}</strong>
        </div>
      </div>

      <div className="modal-actions" style={{ marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={() => window.print()}>
          <i className="ri-printer-line"></i> Print Receipt
        </button>
        <Link to="/track" className="btn btn-primary">
          <i className="ri-truck-line"></i> Track Order Status
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
