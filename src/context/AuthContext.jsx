import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('novastore_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authModal, setAuthModal] = useState(null); // 'google', 'github', null

  useEffect(() => {
    if (user) {
      localStorage.setItem('novastore_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('novastore_user');
    }
  }, [user]);

  // Login with Email & Password
  const login = (email, password) => {
    const nameFromEmail = email.split('@')[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    
    const newUser = {
      id: `usr_${Date.now()}`,
      name: formattedName || "Alex Rivera",
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      provider: 'email',
      joined: new Date().toLocaleDateString()
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  // Register New User
  const register = (fullName, email, password, phone) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: fullName,
      email: email,
      phone: phone,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      provider: 'email',
      joined: new Date().toLocaleDateString()
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  // Google OAuth Simulation
  const loginWithGoogle = (callback) => {
    setAuthModal('google');
    setTimeout(() => {
      const googleUser = {
        id: `goog_${Date.now()}`,
        name: "Alex Rivera",
        email: "alex.rivera@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        provider: 'google',
        joined: new Date().toLocaleDateString()
      };
      setUser(googleUser);
      setAuthModal(null);
      if (callback) callback(googleUser);
    }, 1200);
  };

  // GitHub OAuth Simulation
  const loginWithGithub = (callback) => {
    setAuthModal('github');
    setTimeout(() => {
      const githubUser = {
        id: `gh_${Date.now()}`,
        name: "Alex Rivera (Dev)",
        email: "alex.developer@github.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        provider: 'github',
        joined: new Date().toLocaleDateString()
      };
      setUser(githubUser);
      setAuthModal(null);
      if (callback) callback(githubUser);
    }, 1200);
  };

  // Reset Password Flow
  const resetPassword = (email) => {
    return { success: true, message: `Password reset OTP link sent to ${email}` };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      loginWithGoogle,
      loginWithGithub,
      resetPassword,
      logout,
      authModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
