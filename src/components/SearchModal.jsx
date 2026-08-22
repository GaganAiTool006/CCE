import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('novastore_recent_searches');
    return saved ? JSON.parse(saved) : ["Apple Watch Ultra", "Sony ANC Headphones", "Nike CyberRunner", "Whey Protein", "Gym Dumbbells"];
  });

  const { formatPrice, lang } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('novastore_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  if (!isOpen) return null;

  const popularTags = [
    { label: "⚡ Smartwatch Ultra", keyword: "Apple Watch" },
    { label: "🎧 Noise Cancelling", keyword: "Sony" },
    { label: "💪 Gym Dumbbells", keyword: "Dumbbell" },
    { label: "👟 Cyber Sneakers", keyword: "Nike" },
    { label: "☕ Gourmet Coffee", keyword: "Coffee" },
    { label: "🤖 Kids Robotics", keyword: "Robotics" }
  ];

  const handleSelectSearch = (term) => {
    setQuery(term);
    saveRecent(term);
  };

  const saveRecent = (term) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== term.toLowerCase());
      return [term, ...filtered].slice(0, 5);
    });
  };

  const handleProductClick = (productId) => {
    if (query) saveRecent(query);
    onClose();
    navigate(`/product/${productId}`);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('novastore_recent_searches');
  };

  // Live filter products
  const liveResults = query.trim() ? products.filter(p => {
    const title = (p.title[lang] || p.title.en).toLowerCase();
    const cat = p.category.toLowerCase();
    const q = query.toLowerCase();
    return title.includes(q) || cat.includes(q);
  }) : [];

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-card" onClick={e => e.stopPropagation()}>
        
        {/* Search Header */}
        <div className="search-modal-header">
          <i className="ri-search-line search-modal-icon"></i>
          <input
            type="text"
            placeholder="Search electronics, fashion, gym, gourmet food..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="clear-modal-query" onClick={() => setQuery('')}>
              <i className="ri-close-line"></i>
            </button>
          )}
          <button className="close-search-modal-btn" onClick={onClose}>
            Esc
          </button>
        </div>

        <div className="search-modal-body">
          {/* Live Search Results */}
          {query.trim() ? (
            <div className="live-results-section">
              <h4>Matching Products ({liveResults.length})</h4>
              {liveResults.length === 0 ? (
                <div className="no-search-results">
                  <i className="ri-search-eye-line"></i>
                  <p>No products match "<strong>{query}</strong>"</p>
                </div>
              ) : (
                <div className="live-results-list">
                  {liveResults.map(product => {
                    const title = product.title[lang] || product.title.en;
                    return (
                      <div key={product.id} className="live-result-item" onClick={() => handleProductClick(product.id)}>
                        <img src={product.image} alt={title} className="live-result-img" />
                        <div className="live-result-info">
                          <span className="live-result-category">{product.category}</span>
                          <strong className="live-result-title">{title}</strong>
                        </div>
                        <span className="live-result-price">{formatPrice(product.priceUSD)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="search-suggestions-container">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="suggestion-block">
                  <div className="suggestion-block-header">
                    <span><i className="ri-history-line"></i> Recent Searches</span>
                    <button onClick={clearRecent} className="clear-history-btn">Clear All</button>
                  </div>
                  <div className="recent-chips-list">
                    {recentSearches.map((term, i) => (
                      <button key={i} className="recent-chip" onClick={() => handleSelectSearch(term)}>
                        <i className="ri-time-line"></i> {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Trending Topics */}
              <div className="suggestion-block" style={{ marginTop: '20px' }}>
                <div className="suggestion-block-header">
                  <span><i className="ri-fire-line"></i> Popular Searches</span>
                </div>
                <div className="popular-tags-grid">
                  {popularTags.map((tag, i) => (
                    <button key={i} className="popular-tag-btn" onClick={() => handleSelectSearch(tag.keyword)}>
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
