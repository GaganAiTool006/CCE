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
        {/* Tier 1: Main Header Row */}
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

            {/* Central Search Trigger Box (Desktop) */}
            <div className="search-box-trigger" onClick={() => setSearchModalOpen(true)}>
              <i className="ri-search-line search-icon"></i>
              <span className="search-placeholder">Search tech, fashion, gym, food...</span>
              <span className="search-shortcut-badge">⌘K</span>
            </div>

            {/* Mobile Search Icon Button (Mobile Top Bar) */}
            <button className="mobile-top-search-btn" onClick={() => setSearchModalOpen(true)} title="Search Products">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Desktop Action Utilities (Hidden on Mobile) */}
            <div className="nav-top-utilities desktop-only-utilities">
              
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

            {/* Mobile Top Cart Link */}
            <Link to="/cart" className="mobile-top-cart-btn" title="Shopping Cart">
              <i className="ri-shopping-bag-3-fill"></i>
              <span className="badge-count">{cartCount}</span>
            </Link>

          </div>
        </div>

        {/* Tier 2: Sub-Header Navigation Row (Desktop Only) */}
        <div className="navbar-bottom-tier">
          <div className="container navbar-sub-row">
            
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

      {/* Standalone Off-Canvas Mobile Navigation Side Drawer */}
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
            {/* Search Trigger Button */}
            <button className="mobile-search-trigger-btn" onClick={() => { setMobileOpen(false); setSearchModalOpen(true); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Search products & categories...</span>
            </button>

            {/* VIP 50% OFF Coupon Button */}
            <button className="mobile-offer-btn" onClick={() => { setMobileOpen(false); setOfferModalOpen(true); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 12 20 22 4 22 4 12"></polyline>
                <rect x="2" y="7" width="20" height="5"></rect>
                <line x1="12" y1="22" x2="12" y2="7"></line>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
              </svg>
              <span>VIP 50% OFF Coupon</span>
            </button>

            {/* Mobile Navigation Links with Vector SVG Icons */}
            <nav className="mobile-nav-links">
              <NavLink to="/" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Home Page</span>
              </NavLink>

              <NavLink to="/shop" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Shop Catalog</span>
              </NavLink>

              <NavLink to="/profile" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>My Account & Orders ({ordersCount})</span>
              </NavLink>

              <NavLink to="/track" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>Track Order</span>
              </NavLink>

              <NavLink to="/contact" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>Support & FAQ</span>
              </NavLink>

              <NavLink to="/wishlist" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>Saved Wishlist ({wishlistCount})</span>
              </NavLink>

              <NavLink to="/cart" className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Shopping Cart ({cartCount})</span>
              </NavLink>
            </nav>

            {/* Mobile Settings Controls (Theme, Language, Currency) */}
            <div className="mobile-menu-settings">
              
              {/* Theme Toggle */}
              <div className="mobile-setting-row">
                <span className="mobile-setting-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                  Theme:
                </span>
                <div className="mobile-btn-group">
                  <button className={`mobile-opt-btn ${theme==='dark'?'active':''}`} onClick={toggleTheme}>Dark</button>
                  <button className={`mobile-opt-btn ${theme==='light'?'active':''}`} onClick={toggleTheme}>Light</button>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="mobile-setting-row">
                <span className="mobile-setting-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Language:
                </span>
                <div className="mobile-btn-group">
                  <button className={`mobile-opt-btn ${lang==='en'?'active':''}`} onClick={() => changeLang('en')}>EN</button>
                  <button className={`mobile-opt-btn ${lang==='hi'?'active':''}`} onClick={() => changeLang('hi')}>HI</button>
                </div>
              </div>

              {/* Currency Switcher */}
              <div className="mobile-setting-row">
                <span className="mobile-setting-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  Currency:
                </span>
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
