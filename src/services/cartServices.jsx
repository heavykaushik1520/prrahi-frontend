/* eslint-disable no-unused-vars */
import api from "./api";

const getGuestCartId = () => {
  let guestCartId = localStorage.getItem("guestCartId");
  if (!guestCartId) {
    guestCartId = `temp_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    localStorage.setItem("guestCartId", guestCartId);
  }
  return guestCartId;
};

/*
export const getCart = async (isLoggedIn) => {
  if (isLoggedIn) {
    return await api("/cart", "GET", null, true);
  } else {
    const guestCartId = localStorage.getItem("guestCartId");
    if (guestCartId) {
      return await api(`/guest-cart/${guestCartId}`);
    } else {
      const response = await api("/guest-cart");
      localStorage.setItem("guestCartId", response.guestCartId);
      return response.cart;
    }
  }
};
*/

export const getCart = async (isLoggedIn) => {
  if (isLoggedIn) {
    return await api("/cart", "GET", null, true);
  } else {
    const guestCartId = localStorage.getItem("guestCartId");
    if (guestCartId) {
      return await api(`/guest-cart/${guestCartId}`, "GET"); // Explicitly GET
    } else {
      const createCartResponse = await api("/guest-cart", "POST"); 
      const newGuestCartId = createCartResponse.guestCartId; 
      localStorage.setItem("guestCartId", newGuestCartId);
      return await api(`/guest-cart/${newGuestCartId}`, "GET"); 
    }
  }
};

export const updateCart = async (productId, quantity, isLoggedIn) => {
  const data = { productId, quantity };
  if (isLoggedIn) {
    return await api("/cart", "POST", data, true);
  } else {
    const guestCartId = localStorage.getItem("guestCartId");
    if (guestCartId) {
      return await api(`/guest-cart/${guestCartId}`, "POST", data);
    } else {
      const createCartResponse = await api("/guest-cart", "POST");
      const newGuestCartId = createCartResponse.guestCartId;
      localStorage.setItem("guestCartId", newGuestCartId);

      return await api(`/guest-cart/${newGuestCartId}`, "POST", data);
    }
  }
};

export const deleteCartItem = async (productId, isLoggedIn) => {
  if (isLoggedIn) {
    return await api(`/cart/${productId}`, "DELETE", null, true);
  } else {
    const guestCartId = localStorage.getItem("guestCartId");
    if (guestCartId) {
      return await api(`/guest-cart/${guestCartId}/item/${productId}`, "DELETE");
    } else {
      throw new Error("No guest cart found to delete items from.");
    }
  }
};

export const clearMyCart = async (isLoggedIn) => {
  if (isLoggedIn) {
    return await api("/cart/clear", "DELETE", null, true);
  } else {
    const guestCartId = localStorage.getItem("guestCartId");
    if (guestCartId) {
      return await api(`/guest-cart/${guestCartId}/clear`, "DELETE");
    } else {
      throw new Error("No guest cart found to clear.");
    }
  }
};

export const mergeGuestCartIntoUserCart = async (guestCartId) => {
  return await api("/merge-carts", "POST", { guestCartId }, true); 
};