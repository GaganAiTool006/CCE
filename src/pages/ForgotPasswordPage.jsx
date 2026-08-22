import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { resetPassword } = useAuth();
  const { showToast } = useApp();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'ri-alert-line');
      return;
    }
    resetPassword(email);
    setStep(2);
    showToast(`Verification code sent to ${email}`, 'ri-mail-send-line');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      showToast('Please fill out all fields', 'ri-alert-line');
      return;
    }
    setStep(3);
    showToast('Password reset successfully!', 'ri-checkbox-circle-fill');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Forgot Password</h1>
          <p>Reset your password in 2 easy verification steps.</p>
        </div>

        {step === 1 && (
          <form className="auth-form" onSubmit={handleSendOtp}>
            <div className="form-group">
              <label>Registered Email Address</label>
              <input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Send Reset Code <i className="ri-arrow-right-line"></i>
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="auth-form" onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>6-Digit Verification Code (OTP)</label>
              <input
                type="text"
                placeholder="e.g. 849201"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new strong password..."
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Reset Password <i className="ri-lock-unlock-line"></i>
            </button>
          </form>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="success-icon-wrapper" style={{ margin: '0 auto 16px' }}>
              <i className="ri-checkbox-circle-fill success-icon"></i>
            </div>
            <h3>Password Changed!</h3>
            <p className="text-muted" style={{ margin: '10px 0 20px' }}>Your password has been updated. You can now log in with your new password.</p>
            <Link to="/login" className="btn btn-primary btn-block">
              Back to Login
            </Link>
          </div>
        )}

        <div className="auth-footer">
          Remember your password? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
