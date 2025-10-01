import React, { useState, useEffect } from 'react'; // This is the corrected line
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp } from '../api/authApi';
import { setCredentials } from '../app/features/authSlice';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { userInfo } = useSelector((state) => state.auth);
  const from = location.state?.from || null;

  useEffect(() => {
    if (userInfo) {
      navigate(from || (userInfo.role === 'admin' ? '/admin/dashboard' : '/'));
    }
  }, [navigate, userInfo, from]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendOtp(phoneNumber);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        const data = await verifyOtp(phoneNumber, otp);
        dispatch(setCredentials(data)); 
        
        const destination = from || (data.role === 'admin' ? '/admin/dashboard' : '/');
        navigate(destination);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="login-form">
          <h2>Login to Continue</h2>
          <p>We'll send a verification code to your phone.</p>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+919876543210"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="login-form">
          <h2>Verify Code</h2>
          <p>Enter the 6-digit code sent to {phoneNumber}</p>
          <div className="form-group">
            <label htmlFor="otp">Verification Code</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify & Login'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginPage;