import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, applyCoupon, discountPercent, subtotalUSD, discountAmountUSD, shippingFeeUSD, totalUSD, isFreeShipping } = useCart();
  const { formatPrice, lang, showToast } = useApp();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      showToast(`Coupon "${couponCode.toUpperCase()}" Applied (${res.discount * 100}% OFF)!`, 'ri-price-tag-3-line');
    } else {
      showToast(res.message, 'ri-error-warning-line');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container cart-page-container">
        <h1>Your Shopping Cart</h1>
        <div className="empty-products" style={{ marginTop: '30px' }}>
          <div className="empty-icon"><i className="ri-shopping-bag-line"></i></div>
          <h3>Your Shopping Cart is Empty</h3>
          <p>Explore our flagship products across Tech, Fashion, Fitness, and Gourmet Food!</p>
          <Link to="/shop" className="btn btn-primary">Browse Shop Catalog</Link>
        </div>
      </div>
    );
  }

  const freeShippingProgress = Math.min(100, (subtotalUSD / 50) * 100);

  return (
    <div className="container cart-page-container">
      <h1>Your Shopping Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)</h1>

      {/* Free Shipping Progress Meter */}
      <div className="free-shipping-meter-card">
        <div className="meter-header">
          <i className="ri-truck-fill text-primary"></i>
          {isFreeShipping ? (
            <span><strong>Congratulations!</strong> You unlocked FREE Express Shipping!</span>
          ) : (
            <span>Add <strong>{formatPrice(50 - subtotalUSD)}</strong> more to unlock <strong>FREE Express Shipping</strong>!</span>
          )}
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${freeShippingProgress}%` }}></div>
        </div>
      </div>

      <div className="cart-page-grid">
        <div className="cart-items-table">
          {cart.map(item => {
            const title = item.title[lang] || item.title.en;
            return (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={title}
                  className="cart-item-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = item.fallbackImage || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="cart-item-info">
                  <div className="flex-between">
                    <div>
                      <span className="card-category">{item.category}</span>
                      <h4 className="cart-item-title">{title}</h4>
                    </div>
                    <span className="cart-item-price">{formatPrice(item.priceUSD)}</span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                      <i className="ri-delete-bin-line"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Card */}
        <div className="cart-summary-card">
          <h3>Order Summary</h3>

          <form className="coupon-box" onSubmit={handleApplyCoupon}>
            <input
              type="text"
              placeholder="Coupon code (e.g. SPECIAL50)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button type="submit" className="btn btn-secondary">Apply</button>
          </form>

          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotalUSD)}</strong>
            </div>
            {discountPercent > 0 && (
              <div className="summary-row text-success">
                <span>Discount ({discountPercent * 100}%)</span>
                <strong>-{formatPrice(discountAmountUSD)}</strong>
              </div>
            )}
            <div className="summary-row">
              <span>Estimated Shipping</span>
              <span>{isFreeShipping ? 'FREE' : formatPrice(shippingFeeUSD)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Payable</span>
              <strong className="total-price">{formatPrice(totalUSD)}</strong>
            </div>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-block btn-lg">
            Proceed to Checkout <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
