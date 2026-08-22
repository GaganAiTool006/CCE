import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { wishlist } = useCart();

  return (
    <div className="container wishlist-page-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Wishlist</span>
      </div>
      <h1>Your Saved Wishlist ({wishlist.length})</h1>
      <p>Products you have bookmarked for later.</p>

      {wishlist.length === 0 ? (
        <div className="empty-products" style={{ marginTop: '30px' }}>
          <div className="empty-icon"><i className="ri-heart-3-line"></i></div>
          <h3>Your Wishlist is Empty</h3>
          <p>Tap the heart icon on any product to save it here.</p>
          <Link to="/shop" className="btn btn-primary">Browse Shop Catalog</Link>
        </div>
      ) : (
        <div className="products-grid" style={{ marginTop: '24px' }}>
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
