import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const HomePage = () => {
  // Slider 1: Hero Banner Slider State
  const [heroSlide, setHeroSlide] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 14, mins: 28, secs: 45 });

  // Scroll Container Refs for Sliders
  const categoryScrollRef = useRef(null);
  const flashProductsScrollRef = useRef(null);
  const gymProductsScrollRef = useRef(null);
  const techProductsScrollRef = useRef(null);

  const heroSlides = [
    {
      title: "Apple Watch Ultra 2 & Pro Headphones",
      subtitle: "Titanium GPS case, 100m water resistance, and active noise canceling.",
      tag: "⚡ NEW TECH ARRIVAL",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80",
      ctaPrimary: "Explore Tech Flagships",
      ctaSecondary: "Flash Deals",
      link: "/shop"
    },
    {
      title: "Cyberwear Sneakers & Streetwear",
      subtitle: "Reflective futuristic sneakers and high-density streetwear collection.",
      tag: "🔥 TRENDING CYBERWEAR",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80",
      ctaPrimary: "Shop Cyberwear",
      ctaSecondary: "Fashion Deals",
      link: "/shop"
    },
    {
      title: "Commercial Adjustable Dumbbells",
      subtitle: "5lbs to 52.5lbs quick adjust cast iron gym weights for home workout spaces.",
      tag: "💪 FITNESS SPOTLIGHT",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80",
      ctaPrimary: "Upgrade Home Gym",
      ctaSecondary: "Fitness Deals",
      link: "/shop"
    }
  ];

  // Auto Hero Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Flash Countdown Clock Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, mins: 59, secs: 59 };
        return { hours: 23, mins: 59, secs: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const flashProducts = products.filter(p => p.badge === 'HOT' || p.badge === 'SALE' || p.badgeType === 'hot');
  const techProducts = products.filter(p => p.category === 'tech' || p.category === 'electronics').slice(0, 6);
  const gymProducts = products.filter(p => p.category === 'gym').slice(0, 6);

  return (
    <div className="homepage-root">
      
      {/* --- SLIDER 1: Hero Carousel Banner Slider --- */}
      <section className="container hero-slider-section">
        <div className="hero-slider-card">
          {heroSlides.map((slide, index) => (
            <div 
              key={index} 
              className={`hero-slide-bg-wrapper ${heroSlide === index ? 'active-slide' : 'hidden-slide'}`}
              style={{ display: heroSlide === index ? 'block' : 'none' }}
            >
              <img src={slide.image} alt={slide.title} className="hero-slide-bg-img" />
              <div className="hero-slide-overlay"></div>
              
              <div className="hero-slide-content">
                <span className="hero-tag"><i className="ri-fire-fill"></i> {slide.tag}</span>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>

                <div className="hero-actions">
                  <Link to={slide.link} className="btn btn-primary btn-lg">
                    {slide.ctaPrimary} <i className="ri-arrow-right-line"></i>
                  </Link>
                  <Link to="/shop" className="btn btn-glass btn-lg">
                    <i className="ri-fire-fill fire-icon"></i> {slide.ctaSecondary}
                  </Link>
                </div>

                {/* Ultra-Futuristic Glowing Flash Countdown Clock */}
                <div className="flash-countdown">
                  <span className="countdown-label">
                    <i className="ri-flashlight-fill flash-pulse-icon"></i> FLASH SALE ENDS IN:
                  </span>
                  <div className="timer-boxes-row">
                    <div className="timer-box">
                      <span>{String(countdown.hours).padStart(2, '0')}</span>
                      <small>HRS</small>
                    </div>
                    <span className="colon">:</span>
                    <div className="timer-box">
                      <span>{String(countdown.mins).padStart(2, '0')}</span>
                      <small>MIN</small>
                    </div>
                    <span className="colon">:</span>
                    <div className="timer-box">
                      <span>{String(countdown.secs).padStart(2, '0')}</span>
                      <small>SEC</small>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Slider Arrow Controls */}
          <button 
            className="hero-slider-arrow prev-arrow" 
            onClick={() => setHeroSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
            title="Previous Slide"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <button 
            className="hero-slider-arrow next-arrow" 
            onClick={() => setHeroSlide(prev => (prev + 1) % heroSlides.length)}
            title="Next Slide"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>

          {/* Slider Pagination Dots */}
          <div className="hero-slider-dots">
            {heroSlides.map((_, idx) => (
              <button 
                key={idx} 
                className={`slider-dot ${heroSlide === idx ? 'active' : ''}`}
                onClick={() => setHeroSlide(idx)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* --- Trust & Benefits Bar --- */}
      <section className="container trust-benefits-section">
        <div className="trust-benefits-grid">
          <div className="trust-card">
            <i className="ri-truck-line trust-icon"></i>
            <div>
              <h4>Free Express Delivery</h4>
              <p>Free shipping on orders over $50</p>
            </div>
          </div>
          <div className="trust-card">
            <i className="ri-shield-check-line trust-icon"></i>
            <div>
              <h4>2-Year Official Warranty</h4>
              <p>100% authentic brand items</p>
            </div>
          </div>
          <div className="trust-card">
            <i className="ri-refresh-line trust-icon"></i>
            <div>
              <h4>30-Day Easy Returns</h4>
              <p>No questions asked refund</p>
            </div>
          </div>
          <div className="trust-card">
            <i className="ri-customer-service-2-line trust-icon"></i>
            <div>
              <h4>24/7 Priority Support</h4>
              <p>Live chat & instant assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SLIDER 2: Horizontal Category Cards Slider --- */}
      <section className="container category-slider-section">
        <div className="section-header flex-between">
          <div>
            <h2>Explore Store Departments</h2>
            <p>Browse authentic items across 8 specialized categories.</p>
          </div>
          <div className="slider-nav-btns">
            <button onClick={() => scrollContainer(categoryScrollRef, 'left')} title="Scroll Left">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button onClick={() => scrollContainer(categoryScrollRef, 'right')} title="Scroll Right">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>

        <div className="horizontal-slider-track hidden-scrollbar" ref={categoryScrollRef}>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-cpu-line"></i>
            <h3>Electronics & Tech</h3>
            <span>6 Products <i className="ri-arrow-right-line"></i></span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-t-shirt-line"></i>
            <h3>Men's Apparel</h3>
            <span>3 Products <i className="ri-arrow-right-line"></i></span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-handbag-line"></i>
            <h3>Women's Apparel</h3>
            <span>3 Products <i className="ri-arrow-right-line"></i></span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-dribbble-line"></i>
            <h3>Gym & Fitness</h3>
            <span>3 Products <i className="ri-arrow-right-line"></i></span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-goblet-line"></i>
            <h3>Food & Drinks</h3>
            <span>3 Products <i className="ri-arrow-right-line"></i></span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-robot-line"></i>
            <h3>Kids & Toys</h3>
            <span>2 Products <i className="ri-arrow-right-line"></i></span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-heart-pulse-line"></i>
            <h3>Senior Health</h3>
            <span>2 Products <i className="ri-arrow-right-line"></i></span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-home-4-line"></i>
            <h3>Smart Home</h3>
            <span>2 Products <i className="ri-arrow-right-line"></i></span>
          </Link>
        </div>
      </section>

      {/* --- SLIDER 3: Horizontal Products Carousel (Flash Deals) --- */}
      <section className="container products-slider-section">
        <div className="section-header flex-between">
          <div>
            <h2>🔥 Trending Flash Deals</h2>
            <p>Slide using arrows for 1-click Buy Now checkout items.</p>
          </div>
          <div className="slider-nav-btns">
            <button onClick={() => scrollContainer(flashProductsScrollRef, 'left')} title="Scroll Left">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button onClick={() => scrollContainer(flashProductsScrollRef, 'right')} title="Scroll Right">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>

        <div className="horizontal-products-track hidden-scrollbar" ref={flashProductsScrollRef}>
          {flashProducts.map(product => (
            <div key={product.id} className="slider-product-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* --- Departmental Promotional Banners (2-Column) --- */}
      <section className="container promo-banners-section">
        <div className="promo-banners-grid">
          <div className="promo-banner-card promo-gym">
            <span className="promo-tag">FITNESS SPOTLIGHT</span>
            <h2>Commercial Gym Setup</h2>
            <p>Dumbbells, resistance bands, and workout benches up to 30% OFF.</p>
            <Link to="/shop" className="btn btn-primary">Shop Gym Gear</Link>
          </div>
          <div className="promo-banner-card promo-food">
            <span className="promo-tag">GOURMET & NUTRITION</span>
            <h2>Pure Organic Protein</h2>
            <p>100% whey isolate, cold brew coffee, and keto almond bars.</p>
            <Link to="/shop" className="btn btn-primary">Shop Nutrition</Link>
          </div>
        </div>
      </section>

      {/* --- Electronics & Tech Slider --- */}
      {techProducts.length > 0 && (
        <section className="container products-slider-section">
          <div className="section-header flex-between">
            <div>
              <h2>⚡ Electronics & Tech Flagships</h2>
              <p>Top rated Apple, Sony, Samsung, Keychron, and ASUS gear.</p>
            </div>
            <div className="slider-nav-btns">
              <button onClick={() => scrollContainer(techProductsScrollRef, 'left')} title="Scroll Left">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button onClick={() => scrollContainer(techProductsScrollRef, 'right')} title="Scroll Right">
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>

          <div className="horizontal-products-track hidden-scrollbar" ref={techProductsScrollRef}>
            {techProducts.map(product => (
              <div key={product.id} className="slider-product-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Gym & Fitness Products Slider --- */}
      {gymProducts.length > 0 && (
        <section className="container products-slider-section">
          <div className="section-header flex-between">
            <div>
              <h2>💪 Gym & Fitness Essentials</h2>
              <p>Heavy duty strength equipment for your home workout space.</p>
            </div>
            <div className="slider-nav-btns">
              <button onClick={() => scrollContainer(gymProductsScrollRef, 'left')} title="Scroll Left">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <button onClick={() => scrollContainer(gymProductsScrollRef, 'right')} title="Scroll Right">
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>

          <div className="horizontal-products-track hidden-scrollbar" ref={gymProductsScrollRef}>
            {gymProducts.map(product => (
              <div key={product.id} className="slider-product-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Full All Products Grid Showcase --- */}
      <section className="container home-products-section">
        <div className="section-header flex-between">
          <div>
            <h2>Explore Full Products Grid</h2>
            <p>All authentic items with Buy Now and Add to Cart.</p>
          </div>
          <Link to="/shop" className="btn btn-secondary">
            View All ({products.length} Products) <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="products-grid">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* --- Authorized Brand Partners Strip --- */}
      <section className="container brand-partners-section">
        <div className="brand-partners-card">
          <span className="brand-strip-title">AUTHORIZED OFFICIAL BRAND PARTNERS</span>
          <div className="brand-logos-row">
            <span>APPLE</span>
            <span>SONY</span>
            <span>SAMSUNG</span>
            <span>NIKE</span>
            <span>BOSE</span>
            <span>DYSON</span>
            <span>PROFORM</span>
            <span>OPTIMUM</span>
          </div>
        </div>
      </section>

      {/* --- Customer Reviews & Testimonials Section --- */}
      <section className="container testimonials-section">
        <div className="section-header text-center">
          <span className="testimonials-header-badge">
            <i className="ri-chat-smile-2-fill"></i> VERIFIED COMMUNITY REVIEWS
          </span>
          <h2>What Our 50,000+ Global Buyers Say</h2>
          <p>Real experiences from verified shoppers across tech, fashion, gym, and nutrition.</p>
        </div>

        <div className="testimonials-grid">
          
          <div className="testimonial-card">
            <i className="ri-double-quotes-l testimonial-quote-icon"></i>
            <div className="stars">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
            <p className="testimonial-quote">
              "Super fast delivery! Bought the Apple Watch Ultra 2 and ProForm Cast Iron Dumbbells. Both arrived perfectly packaged within 48 hours."
            </p>
            <div className="testimonial-user">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                alt="Marcus Vance" 
                className="testimonial-avatar" 
              />
              <div className="user-details">
                <strong>Marcus Vance</strong>
                <span className="verified-badge"><i className="ri-checkbox-circle-fill"></i> Verified Buyer</span>
                <span className="purchased-tag">Purchased: Apple Watch & Dumbbells</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <i className="ri-double-quotes-l testimonial-quote-icon"></i>
            <div className="stars">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
            <p className="testimonial-quote">
              "The 1-click Buy Now checkout feature is super convenient. My user profile page tracks all my order IDs with live delivery status!"
            </p>
            <div className="testimonial-user">
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" 
                alt="Priya Sharma" 
                className="testimonial-avatar" 
              />
              <div className="user-details">
                <strong>Priya Sharma</strong>
                <span className="verified-badge"><i className="ri-checkbox-circle-fill"></i> Verified Buyer</span>
                <span className="purchased-tag">Purchased: Wireless Headphones</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <i className="ri-double-quotes-l testimonial-quote-icon"></i>
            <div className="stars">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
            </div>
            <p className="testimonial-quote">
              "Awesome variety — ordered 100% Whey Isolate protein powder, a kids STEM robotics kit, and a smart blood pressure monitor in one smooth cart!"
            </p>
            <div className="testimonial-user">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" 
                alt="David Miller" 
                className="testimonial-avatar" 
              />
              <div className="user-details">
                <strong>David Miller</strong>
                <span className="verified-badge"><i className="ri-checkbox-circle-fill"></i> Verified Buyer</span>
                <span className="purchased-tag">Purchased: Organic Whey & Tech Kit</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
