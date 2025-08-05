import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token.");
      navigate("/sign-in");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api("/auth/user/reset-password", "POST", {
        token,
        newPassword,
      });
      toast.success("Password reset successfully!");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2 className="reset-password-title">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <div>
            <label
              htmlFor="newPassword"
              className="reset-pass-form-label"
            >
              New Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                className="form-input"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;