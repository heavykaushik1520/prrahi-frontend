import React, { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api("/auth/user/forgot-password", "POST", { email });
      toast.success("Reset link sent to your email.");
    } catch (error) {
      toast.error(error.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="forgot-container">
        <div className="forgot-box">
          {/* <h2 className="forgot-title">Forgot Password</h2> */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">ENTER YOUR REGISTERED MAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="forgot-password-submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
