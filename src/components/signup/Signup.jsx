import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../../services/api";
import { useNavigate , Link } from "react-router-dom";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const navigate = useNavigate();


  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    role: "customer",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await api("/auth/user/signup", "POST", formData);
      setSuccess("Signup successful!");
      setError("");
      console.log("User created:", result);

      
      setFormData({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        role: "customer",
        address: "",
      });
      setShowPassword(false);
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    } catch (err) {
      setError(err.message || "Signup failed");
      setSuccess("");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group password-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            rows="3"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          SIGN UP
        </button>
        <p>Already have an account ? <Link className="forgot-password-link" to="/sign-in" >SIGN IN</Link></p>
      </form>
    </div>
  );
};

export default SignupForm;
