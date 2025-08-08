import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./pages/Home";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Collection from "./components/products/Collection";
import Team from "./components/Team/Team";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkoutPage/Checkout";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Profile from "./components/profile/Profile";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import About from "./components/about/About";
import MyOrders from "./components/my-orders/MyOrders";
import ResetPassword from "./components/resetPassword/ResetPassword";
import ContactPage from "./components/contact/Contact";
import WavesAnimation from "./components/waves/WavesAnimation";
import { CartProvider } from "./context/CartContext";
import WavesAnimation from "./components/waves/WavesAnimation";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
};

function AppContent() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/team" element={<Team />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="checkout" element={<Checkout />} /> */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        {/* <Route path="/my-profile" element={<Profile />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/waves" element={<WavesAnimation/>}/>

        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
