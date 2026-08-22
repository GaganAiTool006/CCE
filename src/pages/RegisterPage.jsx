import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import googleSvg from '../assets/icons/google.svg';
import githubSvg from '../assets/icons/github.svg';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { register, loginWithGoogle, loginWithGithub, authModal } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      showToast('Please fill out all required fields', 'ri-alert-line');
      return;
    }
    const res = register(fullName, email, password, phone);
    if (res.success) {
      showToast(`Account created! Welcome to NovaStore, ${res.user.name}!`, 'ri-checkbox-circle-fill');
      navigate('/shop');
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle((user) => {
      showToast(`Signed up with Google as ${user.name}`, 'ri-google-fill');
      navigate('/shop');
    });
  };

  const handleGithubLogin = () => {
    loginWithGithub((user) => {
      showToast(`Signed up with GitHub as ${user.name}`, 'ri-github-fill');
      navigate('/shop');
    });
  };

  return (
    <div className="auth-page-container">
      {authModal && (
        <div className="oauth-popup-overlay">
          <div className="oauth-popup-card">
            <i className="ri-loader-4-line spin-loader"></i>
            <h3>Creating account with {authModal === 'google' ? 'Google' : 'GitHub'}...</h3>
            <p className="text-muted">Connecting securely to authorization server...</p>
          </div>
        </div>
      )}

      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Your Account</h1>
          <p>Join NovaStore to unlock VIP discounts and express order tracking.</p>
        </div>

        {/* Social Auth */}
        <div className="social-auth-group">
          <button className="btn-social btn-google" onClick={handleGoogleLogin}>
            <img src={googleSvg} alt="Google" className="social-icon" />
            Sign Up with Google
          </button>
          <button className="btn-social btn-github" onClick={handleGithubLogin}>
            <img src={githubSvg} alt="GitHub" className="social-icon" />
            Sign Up with GitHub
          </button>
        </div>

        <div className="auth-divider">
          <span>OR FILL REGISTER FORM</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Create Account <i className="ri-arrow-right-line"></i>
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
