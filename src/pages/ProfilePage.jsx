import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { orders, cart, wishlist } = useCart();
  const { formatPrice, lang, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('orders');

  const profileUser = user || {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 019-2834",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    joined: "Aug 2026"
  };

  const getItemTitle = (item) => {
    if (!item || !item.title) return "Flagship Product";
    if (typeof item.title === 'string') return item.title;
    return item.title[lang] || item.title.en || "Flagship Product";
  };

  const getItemImage = (item) => {
    if (!item) return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80";
    if (item.image) return item.image;
    if (Array.isArray(item.images) && item.images.length > 0) return item.images[0];
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80";
  };

  return (
    <div className="container profile-page-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>User Profile Dashboard</span>
      </div>

      {/* User Info Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar-wrapper">
          <img src={profileUser.avatar} alt={profileUser.name} className="profile-avatar-lg" />
        </div>
        <div className="profile-user-info">
          <h2>{profileUser.name}</h2>
          <p className="text-muted">📧 {profileUser.email} | 📞 {profileUser.phone || '+1 (555) 019-2834'}</p>
          <div className="profile-badges">
            <span className="profile-badge VIP"><i className="ri-vip-crown-fill"></i> VIP Member</span>
            <span className="profile-badge verified"><i className="ri-shield-check-fill"></i> Verified Account</span>
          </div>
        </div>
        <button className="btn btn-secondary profile-logout-btn" onClick={() => { logout(); showToast('Logged out of account', 'ri-logout-box-r-line'); }}>
          <i className="ri-logout-box-r-line"></i> Logout
        </button>
      </div>

      {/* Dashboard Tabs */}
      <div className="profile-tabs-bar">
        <button className={`profile-tab ${activeTab==='orders'?'active':''}`} onClick={() => setActiveTab('orders')}>
          <i className="ri-shopping-bag-3-line"></i> Purchased Products ({orders.length})
        </button>
        <button className={`profile-tab ${activeTab==='cart'?'active':''}`} onClick={() => setActiveTab('cart')}>
          <i className="ri-cart-line"></i> Saved Cart Items ({cart.length})
        </button>
        <button className={`profile-tab ${activeTab==='wishlist'?'active':''}`} onClick={() => setActiveTab('wishlist')}>
          <i className="ri-heart-3-line"></i> Saved Wishlist ({wishlist.length})
        </button>
        <button className={`profile-tab ${activeTab==='settings'?'active':''}`} onClick={() => setActiveTab('settings')}>
          <i className="ri-settings-4-line"></i> Account Settings
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="profile-tab-content">
          {orders.length === 0 ? (
            <div className="empty-products">
              <div className="empty-icon"><i className="ri-inbox-archive-line"></i></div>
              <h3>No Purchased Products Found</h3>
              <p>You haven't placed any orders yet. Explore our flagship catalog and purchase products!</p>
              <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, idx) => (
                <div key={idx} className="order-history-card">
                  <div className="order-card-header">
                    <div>
                      <span className="order-id-tag">{order.orderId}</span>
                      <span className="text-muted" style={{ marginLeft: '10px', fontSize: '0.85rem' }}>Date: {order.date}</span>
                    </div>
                    <span className={`order-status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      <i className="ri-truck-line"></i> {order.status}
                    </span>
                  </div>

                  <div className="order-items-grid">
                    {order.items.map((item, i) => (
                      <div key={i} className="order-item-mini">
                        <img 
                          src={getItemImage(item)} 
                          alt={getItemTitle(item)} 
                          className="order-item-img"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80";
                          }}
                        />
                        <div className="order-item-details">
                          <h4>{getItemTitle(item)}</h4>
                          <span className="text-muted">Qty: {item.quantity || 1} | Price: {formatPrice(item.priceUSD || 0)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-footer">
                    <span>Total Amount Paid: <strong className="total-price">{formatPrice(order.totalUSD)}</strong></span>
                    <Link to="/track" className="btn btn-secondary btn-sm">
                      <i className="ri-truck-line"></i> Live Track
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Cart Items */}
      {activeTab === 'cart' && (
        <div className="profile-tab-content">
          {cart.length === 0 ? (
            <div className="empty-products">
              <div className="empty-icon"><i className="ri-shopping-bag-line"></i></div>
              <h3>No Cart Items Saved</h3>
              <p>Your cart is empty.</p>
              <Link to="/shop" className="btn btn-primary">Explore Products</Link>
            </div>
          ) : (
            <div className="products-grid">
              {cart.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="profile-tab-content">
          {wishlist.length === 0 ? (
            <div className="empty-products">
              <div className="empty-icon"><i className="ri-heart-3-line"></i></div>
              <h3>No Wishlist Items</h3>
              <p>Bookmarked items will appear here.</p>
              <Link to="/shop" className="btn btn-primary">Browse Shop</Link>
            </div>
          ) : (
            <div className="products-grid">
              {wishlist.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Account Settings */}
      {activeTab === 'settings' && (
        <div className="profile-tab-content">
          <div className="contact-card">
            <h3><i className="ri-user-settings-line"></i> Edit Account Settings</h3>
            <form className="form-grid" onSubmit={e => { e.preventDefault(); showToast('Profile settings saved!', 'ri-checkbox-circle-fill'); }}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" defaultValue={profileUser.name} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" defaultValue={profileUser.email} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" defaultValue={profileUser.phone} />
              </div>
              <div className="form-group">
                <label>Shipping Address</label>
                <input type="text" defaultValue="742 Evergreen Terrace, New York, NY 10001" />
              </div>
              <div className="form-group full-width">
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
