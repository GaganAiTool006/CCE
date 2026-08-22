import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import googleSvg from '../assets/icons/google.svg';
import githubSvg from '../assets/icons/github.svg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, loginWithGithub, authModal } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter your email and password', 'ri-alert-line');
      return;
    }
    const res = login(email, password);
    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'ri-user-smile-line');
      navigate('/shop');
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle((user) => {
      showToast(`Signed in with Google as ${user.name}`, 'ri-google-fill');
      navigate('/shop');
    });
  };

  const handleGithubLogin = () => {
    loginWithGithub((user) => {
      showToast(`Signed in with GitHub as ${user.name}`, 'ri-github-fill');
      navigate('/shop');
    });
  };

  return (
    <div className="auth-page-container">
      {authModal && (
        <div className="oauth-popup-overlay">
          <div className="oauth-popup-card">
            <i className="ri-loader-4-line spin-loader"></i>
            <h3>Authenticating with {authModal === 'google' ? 'Google' : 'GitHub'}...</h3>
            <p className="text-muted">Connecting securely to authorization server...</p>
          </div>
        </div>
      )}

      <div className="auth-card">
        <div className="auth-header">
          <h1>Sign In to NovaStore</h1>
          <p>Access your orders, saved wishlist, and exclusive member discounts.</p>
        </div>

        {/* Social Logins */}
        <div className="social-auth-group">
          <button className="btn-social btn-google" onClick={handleGoogleLogin}>
            <img src={googleSvg} alt="Google" className="social-icon" />
            Continue with Google
          </button>
          <button className="btn-social btn-github" onClick={handleGithubLogin}>
            <img src={githubSvg} alt="GitHub" className="social-icon" />
            Continue with GitHub
          </button>
        </div>

        <div className="auth-divider">
          <span>OR SIGN IN WITH EMAIL</span>
        </div>

        {/* Standard Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Sign In <i className="ri-arrow-right-line"></i>
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
