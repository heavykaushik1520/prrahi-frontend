import { createContext, useContext, useState, useCallback } from "react";
import { getCart } from "../services/cartServices";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      const response = await getCart(!!localStorage.getItem("jwtToken"));
      setCartCount(response?.products?.length || 0);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
