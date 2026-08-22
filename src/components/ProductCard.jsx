import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { formatPrice, lang, showToast } = useApp();
  const navigate = useNavigate();

  const title = product.title[lang] || product.title.en;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    showToast(`Added "${title}" to Shopping Cart!`, 'ri-shopping-bag-fill');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    showToast(`Proceeding to Checkout for "${title}"`, 'ri-flashlight-line');
    navigate('/checkout');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(wishlisted ? `Removed from Wishlist` : `Saved to Wishlist!`, wishlisted ? 'ri-heart-dislike-line' : 'ri-heart-3-fill');
  };

  return (
    <div className="product-card" data-id={product.id}>
      <div className="card-image-wrapper">
        {product.badge && (
          <span className={`card-badge ${product.badgeType}`}>{product.badge}</span>
        )}
        <button
          className={`wishlist-icon-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          title="Toggle Wishlist"
          aria-label="Toggle Wishlist"
        >
          <i className={wishlisted ? "ri-heart-3-fill" : "ri-heart-3-line"}></i>
        </button>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={title}
            className="product-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = product.fallbackImage || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
            }}
          />
        </Link>
      </div>

      <div className="card-content">
        <span className="card-category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="card-title">
          {title}
        </Link>

        <div className="card-rating">
          <i className="ri-star-fill"></i>
          <strong>{product.rating}</strong>
          <span>({product.reviewsCount} reviews)</span>
        </div>

        <div className="card-bottom-stack">
          <div className="card-price-row">
            <span className="price-tag">{formatPrice(product.priceUSD)}</span>
            <span className="card-stock-label"><i className="ri-checkbox-circle-fill"></i> In Stock</span>
          </div>

          <div className="card-action-btns">
            <button className="add-cart-btn flex-1" onClick={handleAddToCart}>
              <i className="ri-shopping-bag-line"></i> Cart
            </button>
            <button className="buy-now-btn flex-1" onClick={handleBuyNow}>
              <i className="ri-flashlight-fill"></i> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
