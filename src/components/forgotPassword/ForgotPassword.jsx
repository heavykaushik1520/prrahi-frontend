import React, { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api(
        "/auth/user/forgot-password",
        "POST",
        { email }
      );

      // ✅ success toast
      toast.success(
        response?.data?.message ||
          "Reset link sent successfully to your email 📩"
      );

      setEmail(""); // clear input
    } catch (error) {
      // ❌ error toast
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">ENTER YOUR REGISTERED MAIL</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="forgot-password-submit-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
