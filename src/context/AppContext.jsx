import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('novastore_theme') || 'dark');
  const [currency, setCurrency] = useState(() => localStorage.getItem('novastore_currency') || 'USD');
  const [currencySymbol, setCurrencySymbol] = useState(() => localStorage.getItem('novastore_currency_symbol') || '$');
  const [lang, setLang] = useState(() => localStorage.getItem('novastore_lang') || 'en');
  const [toasts, setToasts] = useState([]);

  const currencyRates = {
    USD: { rate: 1.0, symbol: '$' },
    INR: { rate: 83.5, symbol: '₹' },
    EUR: { rate: 0.92, symbol: '€' }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('novastore_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    showToast(`Switched to ${theme === 'dark' ? 'LIGHT' : 'DARK'} theme`, 'ri-moon-line');
  };

  const changeCurrency = (currCode, symbol) => {
    setCurrency(currCode);
    setCurrencySymbol(symbol);
    localStorage.setItem('novastore_currency', currCode);
    localStorage.setItem('novastore_currency_symbol', symbol);
    showToast(`Currency changed to ${currCode}`, 'ri-money-dollar-circle-line');
  };

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('novastore_lang', newLang);
    showToast(`Language set to ${newLang === 'hi' ? 'Hindi' : 'English'}`, 'ri-global-line');
  };

  const formatPrice = (priceUSD) => {
    const rate = currencyRates[currency]?.rate || 1.0;
    const symbol = currencyRates[currency]?.symbol || '$';
    const converted = (priceUSD * rate).toFixed(2);
    return `${symbol}${converted}`;
  };

  const showToast = (message, iconClass = 'ri-information-line') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, iconClass }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      currency,
      currencySymbol,
      changeCurrency,
      lang,
      changeLang,
      formatPrice,
      showToast,
      toasts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
