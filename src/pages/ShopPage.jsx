import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';

const ShopPage = ({ searchKeyword }) => {
  const { lang } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(3500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');

  const filteredProducts = useMemo(() => {
    let result = products.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const title = (item.title[lang] || item.title.en).toLowerCase();
      const query = (searchKeyword || '').toLowerCase();
      const matchesSearch = !query || title.includes(query) ||
                            item.category.toLowerCase().includes(query) ||
                            (item.specs && item.specs.some(s => s.toLowerCase().includes(query)));
      const matchesPrice = item.priceUSD <= maxPrice;
      const matchesStock = !inStockOnly || item.inStock;

      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [activeCategory, searchKeyword, maxPrice, inStockOnly, sortBy, lang]);

  return (
    <div className="container catalog-page-container">
      {/* Catalog Header */}
      <div className="catalog-page-header">
        <h1>All Products Catalog</h1>
        <p>Explore authentic flagship tech, cyber fashion, gym equipment, gourmet food, kids' toys, and home gear.</p>
      </div>

      <main className="catalog-section">
        {/* Category Filter Chips Bar */}
        <div className="categories-bar">
          <button className={`category-chip ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
            <i className="ri-apps-2-line"></i> All ({products.length})
          </button>
          <button className={`category-chip ${activeCategory === 'electronics' ? 'active' : ''}`} onClick={() => setActiveCategory('electronics')}>
            <i className="ri-cpu-line"></i> Electronics
          </button>
          <button className={`category-chip ${activeCategory === 'men' ? 'active' : ''}`} onClick={() => setActiveCategory('men')}>
            <i className="ri-user-line"></i> Men's Apparel
          </button>
          <button className={`category-chip ${activeCategory === 'women' ? 'active' : ''}`} onClick={() => setActiveCategory('women')}>
            <i className="ri-user-heart-line"></i> Women's Apparel
          </button>
          <button className={`category-chip ${activeCategory === 'gym' ? 'active' : ''}`} onClick={() => setActiveCategory('gym')}>
            <i className="ri-dribbble-line"></i> Gym & Fitness
          </button>
          <button className={`category-chip ${activeCategory === 'food' ? 'active' : ''}`} onClick={() => setActiveCategory('food')}>
            <i className="ri-goblet-line"></i> Food & Drinks
          </button>
          <button className={`category-chip ${activeCategory === 'kids' ? 'active' : ''}`} onClick={() => setActiveCategory('kids')}>
            <i className="ri-robot-line"></i> Kids & Toys
          </button>
          <button className={`category-chip ${activeCategory === 'seniors' ? 'active' : ''}`} onClick={() => setActiveCategory('seniors')}>
            <i className="ri-heart-pulse-line"></i> Senior Wellness
          </button>
          <button className={`category-chip ${activeCategory === 'home' ? 'active' : ''}`} onClick={() => setActiveCategory('home')}>
            <i className="ri-home-4-line"></i> Smart Home
          </button>
        </div>

        {/* Filters Toolbar */}
        <div className="catalog-toolbar">
          <div className="toolbar-left">
            <div className="price-filter">
              <label htmlFor="priceRange">Max Price: <strong>${maxPrice}</strong></label>
              <input
                type="range"
                id="priceRange"
                min="30"
                max="3500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
            <div className="stock-filter">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                In Stock Only
              </label>
            </div>
            <span className="results-count-badge">Showing {filteredProducts.length} Items</span>
          </div>

          <div className="toolbar-right">
            <div className="sort-wrapper">
              <label htmlFor="sortSelect">Sort By:</label>
              <select id="sortSelect" className="styled-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="view-toggle">
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Grid View">
                <i className="ri-grid-fill"></i>
              </button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="List View">
                <i className="ri-list-check"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-products">
            <div className="empty-icon"><i className="ri-search-eye-line"></i></div>
            <h3>No Matching Products Found</h3>
            <p>Try clearing filters or adjusting max price slider.</p>
            <button className="btn btn-primary" onClick={() => { setActiveCategory('all'); setMaxPrice(3500); setInStockOnly(false); }}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={`products-grid ${viewMode === 'list' ? 'list-mode' : ''}`}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
