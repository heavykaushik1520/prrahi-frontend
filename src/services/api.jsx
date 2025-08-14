// src/services/api.js
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

// 🔁 Refresh token function
export const refreshToken = async () => {
  const res = await fetch("https://artiststation.co.in/prrahi-api/api/auth/user/refresh-token", {
    method: "POST",
    credentials: "include", // Ensures cookies are sent
  });

  if (!res.ok) throw new Error("Refresh token failed");

  const data = await res.json();
  localStorage.setItem("jwtToken", data.token);
  return data.token;
};

// 📦 Universal API function
const api = async (endpoint, method = "GET", data = null, auth = false) => {
   if (endpoint === undefined) {
    console.error("🚨 API called with undefined endpoint!", new Error().stack);
  }
  let token = localStorage.getItem("jwtToken");
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const makeRequest = async () => {
    console.log("endpoint", endpoint)
    const response = await fetch(
      `https://artiststation.co.in/prrahi-api/api${endpoint}`,
      options
    );
    const contentType = response.headers.get("content-type");

    if (response.status === 401 && auth) {
      throw { isAuthError: true }; // custom error flag
    }

    if (!response.ok) {
      if (contentType?.includes("application/json")) {
        const err = await response.json();
        throw new Error(err.message || "API request failed");
      } else {
        throw new Error("API request failed");
      }
    }

    if (
      response.status === 204 ||
      !(contentType && contentType.includes("application/json"))
    ) {
      return null;
    }

    return await response.json();
  };

  try {
    return await makeRequest();
  } catch (err) {
    if (err.isAuthError && auth) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          onRefreshed(newToken);
          headers["Authorization"] = `Bearer ${newToken}`;
          return await makeRequest();
        } catch (refreshError) {
          throw new Error(
            "Session expired. Please log in again.",
            refreshError
          );
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(async (newToken) => {
            headers["Authorization"] = `Bearer ${newToken}`;
            try {
              const retryRes = await makeRequest();
              resolve(retryRes);
            } catch (retryErr) {
              reject(retryErr);
            }
          });
        });
      }
    }

    throw err;
  }
};

export default api;
