import React, { createContext, useContext, useState, useEffect } from 'react';
import { products, coupons } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('novastore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('novastore_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Default Bought Orders so by default User Profile has real order history!
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('novastore_orders');
    if (saved) return JSON.parse(saved);
    
    // Default Mock Purchased Orders
    return [
      {
        orderId: "#NOVA-89102",
        date: "Aug 20, 2026",
        status: "Delivered",
        items: [
          { ...products[0], quantity: 1 },
          { ...products[1], quantity: 1 }
        ],
        totalUSD: 1197.00,
        shippingInfo: { name: "Alex Rivera", address: "742 Evergreen Terrace, New York" }
      },
      {
        orderId: "#NOVA-74129",
        date: "Aug 15, 2026",
        status: "Processing",
        items: [
          { ...products[3], quantity: 1 }
        ],
        totalUSD: 249.99,
        shippingInfo: { name: "Alex Rivera", address: "742 Evergreen Terrace, New York" }
      }
    ];
  });

  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('novastore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('novastore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('novastore_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart Operations
  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
    }
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
    setAppliedCoupon(null);
  };

  // Add completed order to history
  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setWishlist(prev => {
      const exists = prev.some(item => item.id === productId);
      if (exists) {
        return prev.filter(item => item.id !== productId);
      } else {
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const applyCoupon = (code) => {
    const upperCode = code.trim().toUpperCase();
    if (coupons[upperCode]) {
      setAppliedCoupon(upperCode);
      setDiscountPercent(coupons[upperCode]);
      return { success: true, discount: coupons[upperCode] };
    }
    return { success: false, message: "Invalid coupon code" };
  };

  // Pricing math
  const subtotalUSD = cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
  const discountAmountUSD = subtotalUSD * discountPercent;
  const afterDiscountUSD = subtotalUSD - discountAmountUSD;
  const isFreeShipping = afterDiscountUSD >= 50;
  const shippingFeeUSD = (cart.length > 0 && !isFreeShipping) ? 5.00 : 0;
  const totalUSD = afterDiscountUSD + shippingFeeUSD;

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      orders,
      addOrder,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isWishlisted,
      applyCoupon,
      appliedCoupon,
      discountPercent,
      subtotalUSD,
      discountAmountUSD,
      shippingFeeUSD,
      totalUSD,
      isFreeShipping,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      wishlistCount: wishlist.length,
      ordersCount: orders.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
