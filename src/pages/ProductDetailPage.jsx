import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { formatPrice, lang, showToast } = useApp();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const product = products.find(p => p.id === id) || products[0];
  const title = product.title[lang] || product.title.en;
  const desc = product.description[lang] || product.description.en;
  const wishlisted = isWishlisted(product.id);

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    showToast(`Added ${quantity} x "${title}" to Shopping Cart!`, 'ri-shopping-bag-fill');
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    showToast(`Proceeding to Checkout for "${title}"`, 'ri-flashlight-line');
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    showToast(wishlisted ? `Removed from Wishlist` : `Saved to Wishlist!`, wishlisted ? 'ri-heart-dislike-line' : 'ri-heart-3-fill');
  };

  return (
    <div className="container product-page-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/shop">Shop Catalog</Link> &gt; <span>{title}</span>
      </div>

      <div className="pdp-layout">
        <div className="pdp-image-col">
          <div className="pdp-main-img-card">
            {product.badge && <span className={`card-badge ${product.badgeType}`}>{product.badge}</span>}
            <img
              src={product.image}
              alt={title}
              className="pdp-main-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = product.fallbackImage || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </div>

        <div className="pdp-info">
          <div>
            <span className="card-category">{product.category}</span>
            <h1 className="pdp-title">{title}</h1>
            <div className="product-meta">
              <div className="rating-box">
                <i className="ri-star-fill" style={{ color: 'var(--accent-warning)' }}></i> <strong>{product.rating}</strong> ({product.reviewsCount} verified reviews)
              </div>
              <span className="stock-status">
                <i className="ri-checkbox-circle-fill"></i> {product.inStock ? 'In Stock (Express Delivery)' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="pdp-price-tag">{formatPrice(product.priceUSD)}</div>

          <p className="product-description">{desc}</p>

          {/* Technical Specs Checklist */}
          <div className="specs-section">
            <h4><i className="ri-list-settings-line"></i> Technical Highlights:</h4>
            <ul className="specs-list">
              {product.specs.map((spec, i) => <li key={i}>{spec}</li>)}
            </ul>
          </div>

          {/* Color Selectors */}
          {product.colors && product.colors.length > 0 && (
            <div className="selector-group">
              <label>Color Options:</label>
              <div className="color-options">
                {product.colors.map((c, i) => (
                  <span key={i} className={`color-dot ${i === 0 ? 'active' : ''}`} style={{ background: c }}></span>
                ))}
              </div>
            </div>
          )}

          {/* Action Group */}
          <div className="action-group">
            <div className="quantity-picker">
              <button onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
            </div>
            <button className="btn btn-secondary btn-lg" onClick={handleAddToCart}>
              <i className="ri-shopping-bag-line"></i> Add to Cart
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleBuyNow}>
              <i className="ri-flashlight-fill"></i> Buy Now
            </button>
            <button className={`wishlist-pdp-btn ${wishlisted ? 'active' : ''}`} onClick={handleToggleWishlist} title="Bookmark Wishlist">
              <i className={wishlisted ? "ri-heart-3-fill" : "ri-heart-3-line"}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section" style={{ marginTop: '50px' }}>
          <h2>Related Products You May Like</h2>
          <div className="products-grid" style={{ marginTop: '20px' }}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
