import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import api from '../../services/api'; 
import { useAuth } from '../../context/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { mergeGuestCartIntoUserCart } from '../../services/cartServices';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 

  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      setLoading(false); 
      return;
    }

    try {
      
      const result = await api('/auth/user/signin', 'POST', formData);

      if (result && result.token) {
        login(result.token); 

        const guestCartId = localStorage.getItem('guestCartId');

        /*
        if(guestCartId){
          try{
             await api('/merge-carts', 'POST', { guestCartId }, true);
             localStorage.removeItem('guestCartId');
             console.log('Guest cart successfully merged with user cart.');
          } catch(mergeError){
            console.error('Error merging carts:', mergeError);
          }
        }
        */
       if (guestCartId) {
          try {
            await mergeGuestCartIntoUserCart(guestCartId);
            localStorage.removeItem('guestCartId');
            console.log('Guest cart successfully merged with user cart.');
          } catch (mergeError) {
            console.error('Error merging carts:', mergeError);
          }
        }

        setSuccess('Sign in successful!');
        setError('');
        console.log('Logged in user:', result);
        navigate('/'); 
      } else {
        throw new Error(result.message || 'Sign in failed: No token received.');
      }
    } catch (err) {
      console.error("Sign in error:", err);
      
      setError(err.message || 'Sign in failed. Please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h3 className="form-title">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label>Email </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group password-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
            <span className="password-toggle" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>
        <div className='forgot-password'>
          <Link className="forgot-password-link"
          to="/forgot-password"> Forgot Password ?</Link>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Signing In...' : 'SIGN IN'}
        </button>
        <p>Don't have account ? <Link className='forgot-password-link' to="/sign-up" >SIGN UP</Link></p>
      </form>
      
    </div>
  );
};

export default Signin;