import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const HomePage = () => {
  // Slider 1: Hero Banner Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5 * 3600 + 24 * 60 + 19);

  // Scroll Container Refs for Slider 2 & 3
  const categoryScrollRef = useRef(null);
  const flashProductsScrollRef = useRef(null);
  const gymProductsScrollRef = useRef(null);
  const techProductsScrollRef = useRef(null);

  const heroSlides = [
    {
      tag: "⚡ Next-Gen Electronics & Flagships",
      title: "Elevate Your Lifestyle With Premium Innovations",
      subtitle: "Discover authentic smartphones, ANC headphones, 4K OLED monitors, and smartwatches with 1-click Buy Now.",
      ctaPrimary: "Explore Full Catalog",
      ctaSecondary: "Flash Deals",
      bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      categoryLink: "/shop"
    },
    {
      tag: "🔥 Cyberwear & Premium Apparel",
      title: "Redefine Streetwear With Cyberpunk Fashion",
      subtitle: "Unmatched style with waterproof bomber jackets, ZoomX running sneakers, leather handbags, and silk dresses.",
      ctaPrimary: "Shop Cyberwear",
      ctaSecondary: "Fashion Deals",
      bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      categoryLink: "/shop"
    },
    {
      tag: "💪 Heavy Duty Gym & Fitness Gear",
      title: "Build Your Dream Gym Setup At Home",
      subtitle: "Commercial grade adjustable dumbbells, workout benches, speed resistance bands, and pure whey protein isolate.",
      ctaPrimary: "Explore Gym Gear",
      ctaSecondary: "Fitness Deals",
      bgImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
      categoryLink: "/shop"
    }
  ];

  // Auto Slider Timer
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);

    const countdownTimer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(slideTimer);
      clearInterval(countdownTimer);
    };
  }, [heroSlides.length]);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  // Scroll strictly via buttons (scrollbars hidden via CSS)
  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const flashProducts = products.filter(p => p.badgeType === 'hot');
  const techProducts = products.filter(p => p.category === 'electronics');
  const gymProducts = products.filter(p => p.category === 'gym');

  return (
    <div className="home-page">

      {/* --- SLIDER 1: Hero Banner Carousel with High-Contrast Text --- */}
      <section className="hero-slider-section">
        <div className="container hero-slider-container">
          <div className="hero-slider-card">
            
            {/* Background Image & High Contrast Gradient Overlay */}
            <div className="hero-slide-bg-wrapper">
              <img
                src={heroSlides[currentSlide].bgImage}
                alt={heroSlides[currentSlide].title}
                className="hero-slide-bg-img"
              />
              <div className="hero-slide-overlay"></div>
            </div>

            {/* Slide Content with High Contrast Text Shadows */}
            <div className="hero-slide-content">
              <span className="hero-tag">
                <i className="ri-sparkles-fill"></i> {heroSlides[currentSlide].tag}
              </span>
              <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
              <p className="hero-subtitle">{heroSlides[currentSlide].subtitle}</p>

              <div className="hero-actions">
                <Link to={heroSlides[currentSlide].categoryLink} className="btn btn-primary btn-lg">
                  {heroSlides[currentSlide].ctaPrimary} <i className="ri-arrow-right-line"></i>
                </Link>
                <Link to="/shop" className="btn btn-glass btn-lg">
                  <i className="ri-fire-fill fire-icon"></i> {heroSlides[currentSlide].ctaSecondary}
                </Link>
              </div>

              {/* Countdown Timer */}
              <div className="flash-countdown">
                <span className="countdown-label">Flash Sale Ends In:</span>
                <div className="timer-box"><span>{hours}</span><small>HRS</small></div>
                <span className="colon">:</span>
                <div className="timer-box"><span>{minutes}</span><small>MIN</small></div>
                <span className="colon">:</span>
                <div className="timer-box"><span>{seconds}</span><small>SEC</small></div>
              </div>
            </div>

            {/* Hero Navigation Arrow Buttons */}
            <button
              className="hero-slider-arrow prev-arrow"
              onClick={() => setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              aria-label="Previous Slide"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button
              className="hero-slider-arrow next-arrow"
              onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
              aria-label="Next Slide"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>

            {/* Pagination Dots */}
            <div className="hero-slider-dots">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                ></button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- Trust & Benefits Bar --- */}
      <section className="container trust-benefits-section">
        <div className="trust-benefits-grid">
          <div className="trust-card">
            <i className="ri-truck-line trust-icon"></i>
            <div>
              <h4>Free Global Shipping</h4>
              <p>On all orders over $50</p>
            </div>
          </div>
          <div className="trust-card">
            <i className="ri-shield-check-line trust-icon"></i>
            <div>
              <h4>30-Day Guarantee</h4>
              <p>100% full money-back refund</p>
            </div>
          </div>
          <div className="trust-card">
            <i className="ri-lock-2-line trust-icon"></i>
            <div>
              <h4>100% Secure Payment</h4>
              <p>Cards, GPay, Apple Pay & UPI</p>
            </div>
          </div>
          <div className="trust-card">
            <i className="ri-headphone-line trust-icon"></i>
            <div>
              <h4>24/7 VIP Support</h4>
              <p>Dedicated customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SLIDER 2: Button-Only Scrollable Category Cards (Hidden Scrollbar) --- */}
      <section className="container category-slider-section">
        <div className="section-header flex-between">
          <div>
            <h2>Explore Departments</h2>
            <p>Use arrow buttons to scroll through all 8 departments.</p>
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
            <span>6 Products &rarr;</span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-t-shirt-line"></i>
            <h3>Men's Apparel</h3>
            <span>3 Products &rarr;</span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-handbag-line"></i>
            <h3>Women's Apparel</h3>
            <span>3 Products &rarr;</span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-dribbble-line"></i>
            <h3>Gym & Fitness</h3>
            <span>3 Products &rarr;</span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-goblet-line"></i>
            <h3>Food & Drinks</h3>
            <span>3 Products &rarr;</span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-robot-line"></i>
            <h3>Kids & Toys</h3>
            <span>2 Products &rarr;</span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-heart-pulse-line"></i>
            <h3>Senior Health</h3>
            <span>2 Products &rarr;</span>
          </Link>
          <Link to="/shop" className="slider-category-card">
            <i className="ri-home-4-line"></i>
            <h3>Smart Home</h3>
            <span>2 Products &rarr;</span>
          </Link>
        </div>
      </section>

      {/* --- SLIDER 3: Horizontal Products Items Carousel (Flash Deals) --- */}
      <section className="container products-slider-section" style={{ marginTop: '50px' }}>
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
      <section className="container promo-banners-section" style={{ marginTop: '50px' }}>
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
        <section className="container products-slider-section" style={{ marginTop: '50px' }}>
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
        <section className="container products-slider-section" style={{ marginTop: '50px' }}>
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
      <section className="container home-products-section" style={{ marginTop: '50px' }}>
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
      <section className="container brand-partners-section" style={{ margin: '50px auto' }}>
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

      {/* --- Upgraded Customer Reviews & Testimonials Section --- */}
      <section className="container testimonials-section" style={{ margin: '30px auto 40px' }}>
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
