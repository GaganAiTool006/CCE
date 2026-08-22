import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import SearchModal from './SearchModal';
import OfferModal from './OfferModal';

const Navbar = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const { cartCount, wishlistCount, ordersCount } = useCart();
  const { theme, toggleTheme, currency, currencySymbol, changeCurrency, lang, changeLang, showToast } = useApp();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        {/* Tier 1: Main Header Row (Logo | Search Trigger | Quick Action Utilities) */}
        <div className="navbar-top-tier">
          <div className="container navbar-flex-row">
            
            {/* Mobile Drawer Hamburger SVG Button */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>

            {/* Brand Logo */}
            <Link to="/" className="brand-logo">
              <div className="logo-icon">
                <i className="ri-flashlight-fill"></i>
              </div>
              <span className="logo-text">Nova<span className="highlight">Store</span></span>
            </Link>

            {/* Central Search Trigger Box */}
            <div className="search-box-trigger" onClick={() => setSearchModalOpen(true)}>
              <i className="ri-search-line search-icon"></i>
              <span className="search-placeholder">Search tech, fashion, gym, food...</span>
              <span className="search-shortcut-badge">⌘K</span>
            </div>

            {/* Main Action Utilities */}
            <div className="nav-top-utilities">
              
              {/* 50% OFF VIP Deal Button */}
              <button className="util-btn offer-nav-btn" onClick={() => setOfferModalOpen(true)} title="Claim VIP 50% OFF Deal">
                <i className="ri-gift-fill text-warning"></i>
                <span className="offer-btn-text">50% OFF</span>
              </button>

              {/* Theme Toggle */}
              <button className="util-btn icon-btn" onClick={toggleTheme} title="Toggle Dark/Light Theme">
                <i className={theme === 'dark' ? "ri-sun-line" : "ri-moon-line"}></i>
              </button>

              {/* User Account / Profile */}
              {user ? (
                <div className="dropdown-wrapper">
                  <div className="user-avatar-btn">
                    <img src={user.avatar} alt={user.name} className="user-avatar-img" />
                    <span>{user.name.split(' ')[0]}</span>
                    <i className="ri-arrow-down-s-line"></i>
                  </div>
                  <div className="dropdown-menu">
                    <div style={{ padding: '8px 12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Signed in as <strong>{user.email}</strong>
                    </div>
                    <Link to="/profile" className="dropdown-item">
                      <i className="ri-user-settings-line"></i> Profile & Orders ({ordersCount})
                    </Link>
                    <button className="dropdown-item" onClick={() => { logout(); showToast('Logged out successfully', 'ri-logout-box-r-line'); }}>
                      <i className="ri-logout-box-r-line"></i> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/profile" className="util-btn icon-btn" title="Profile Dashboard">
                  <i className="ri-user-3-line"></i>
                </Link>
              )}

              {/* Wishlist Link */}
              <Link to="/wishlist" className="util-btn icon-btn badge-btn" title="Wishlist">
                <i className="ri-heart-3-line"></i>
                <span className="badge-count">{wishlistCount}</span>
              </Link>

              {/* Shopping Cart Button */}
              <Link to="/cart" className="util-btn cart-nav-btn" title="Shopping Cart">
                <i className="ri-shopping-bag-3-fill"></i>
                <span className="cart-btn-text">Cart</span>
                <span className="badge-count">{cartCount}</span>
              </Link>

            </div>
          </div>
        </div>

        {/* Tier 2: Sub-Header Navigation Row (Lower Category Links & Language/Currency Controls) */}
        <div className="navbar-bottom-tier">
          <div className="container navbar-sub-row">
            
            {/* Nav Links directly under Logo */}
            <nav className="nav-sub-menu">
              <NavLink to="/" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                <i className="ri-home-4-line"></i> Home
              </NavLink>
              <NavLink to="/shop" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                <i className="ri-store-2-line"></i> Shop Catalog
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                <i className="ri-user-settings-line"></i> My Account & Orders
              </NavLink>
              <NavLink to="/track" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                <i className="ri-truck-line"></i> Track Order
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "sub-nav-link active" : "sub-nav-link"}>
                <i className="ri-customer-service-2-line"></i> Support & FAQ
              </NavLink>
            </nav>

            {/* Language & Currency Controls in Sub-Header */}
            <div className="nav-sub-controls">
              
              {/* Language Selector */}
              <div className="dropdown-wrapper">
                <button className="sub-control-btn" aria-label="Change Language">
                  <i className="ri-global-line"></i>
                  <span>Lang: {lang.toUpperCase()}</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                <div className="dropdown-menu">
                  <button className={`dropdown-item ${lang === 'en' ? 'active' : ''}`} onClick={() => changeLang('en')}>English (EN)</button>
                  <button className={`dropdown-item ${lang === 'hi' ? 'active' : ''}`} onClick={() => changeLang('hi')}>हिन्दी (HI)</button>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="dropdown-wrapper">
                <button className="sub-control-btn" aria-label="Change Currency">
                  <span className="currency-symbol">{currencySymbol}</span>
                  <span>Currency: {currency}</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                <div className="dropdown-menu">
                  <button className={`dropdown-item ${currency === 'USD' ? 'active' : ''}`} onClick={() => changeCurrency('USD', '$')}>USD ($)</button>
                  <button className={`dropdown-item ${currency === 'INR' ? 'active' : ''}`} onClick={() => changeCurrency('INR', '₹')}>INR (₹)</button>
                  <button className={`dropdown-item ${currency === 'EUR' ? 'active' : ''}`} onClick={() => changeCurrency('EUR', '€')}>EUR (€)</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Standalone Mobile Navigation Side Drawer */}
      <div className={`mobile-menu-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)}></div>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <div className="brand-logo">
              <div className="logo-icon"><i className="ri-flashlight-fill"></i></div>
              <span className="logo-text">Nova<span className="highlight">Store</span></span>
            </div>
            
            {/* Close SVG Button */}
            <button className="close-drawer-btn" onClick={() => setMobileOpen(false)} aria-label="Close Navigation Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="mobile-drawer-body">
            <button className="mobile-search-trigger-btn" onClick={() => { setMobileOpen(false); setSearchModalOpen(true); }}>
              <i className="ri-search-line"></i> Search all products...
            </button>

            <button className="mobile-offer-btn" onClick={() => { setMobileOpen(false); setOfferModalOpen(true); }}>
              <i className="ri-gift-fill text-warning"></i> VIP 50% OFF Coupon
            </button>

            <nav className="mobile-nav-links">
              <NavLink to="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="ri-home-4-line"></i> Home Page
              </NavLink>
              <NavLink to="/shop" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="ri-store-2-line"></i> Shop Catalog
              </NavLink>
              <NavLink to="/profile" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="ri-user-settings-line"></i> Profile & Orders ({ordersCount})
              </NavLink>
              <NavLink to="/track" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="ri-truck-line"></i> Track Order
              </NavLink>
              <NavLink to="/contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="ri-customer-service-2-line"></i> Support & FAQ
              </NavLink>
              <NavLink to="/wishlist" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="ri-heart-3-line"></i> Saved Wishlist ({wishlistCount})
              </NavLink>
              <NavLink to="/cart" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <i className="ri-shopping-bag-3-line"></i> Shopping Cart ({cartCount})
              </NavLink>
            </nav>

            <div className="mobile-menu-settings">
              <div className="mobile-setting-row">
                <span><i className="ri-global-line"></i> Language:</span>
                <div className="mobile-btn-group">
                  <button className={`mobile-opt-btn ${lang==='en'?'active':''}`} onClick={() => changeLang('en')}>EN</button>
                  <button className={`mobile-opt-btn ${lang==='hi'?'active':''}`} onClick={() => changeLang('hi')}>HI</button>
                </div>
              </div>
              <div className="mobile-setting-row">
                <span><i className="ri-money-dollar-circle-line"></i> Currency:</span>
                <div className="mobile-btn-group">
                  <button className={`mobile-opt-btn ${currency==='USD'?'active':''}`} onClick={() => changeCurrency('USD', '$')}>USD</button>
                  <button className={`mobile-opt-btn ${currency==='INR'?'active':''}`} onClick={() => changeCurrency('INR', '₹')}>INR</button>
                  <button className={`mobile-opt-btn ${currency==='EUR'?'active':''}`} onClick={() => changeCurrency('EUR', '€')}>EUR</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Offer Modals */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <OfferModal isOpen={offerModalOpen} onClose={() => setOfferModalOpen(false)} />
    </>
  );
};

export default Navbar;
