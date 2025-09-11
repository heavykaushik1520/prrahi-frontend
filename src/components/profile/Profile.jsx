// src/pages/Profile.jsx

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import { MdLogout } from "react-icons/md";
import TopBanner from "../top/TopBanner";


const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await api("/auth/user/me", "GET", null, true);
        setUser?.(profile);
      } catch (err) {
        setError(err.message || "Failed to fetch profile");
        toast.error(err.message || "Session expired. Please login again.");
        logout();
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  if (loading) {
    return <div className="profile-loading">Loading your profile...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  return (
    <>
    <TopBanner/>
    <div className="profile-container">
      <h2 className="profile-title">MY PROFILE</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user?.firstname} {user?.lastname}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>
        <p><strong>Address:</strong> {user?.address || 'Not provided'}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <Link to="/my-orders" className="my-orders-btn">MY ORDERS</Link>
        <button className="logout-btn" onClick={logout}><MdLogout />Logout</button>
      </div>
    </div>
    </>
  );
};

export default Profile;

