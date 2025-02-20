// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartCount, setCartCount] = useState(0);
//   const API_URL = "http://localhost:5001/api/cart"; // Ensure the backend port is correct

//   const updateCartCount = async () => {
//     try {
//       console.log("📦 Fetching cart count...");
//       const response = await fetch(API_URL, {
//         method: "GET",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) throw new Error("❌ Failed to fetch cart data");

//       const data = await response.json();
//       console.log("✅ Cart data received:", data);

//       const itemCount = data?.items?.length || 0; // Correctly count cart items
//       setCartCount(itemCount);
//     } catch (error) {
//       console.error("🔥 Error fetching cart count:", error);
//     }
//   };

//   useEffect(() => {
//     updateCartCount();
//   }, []);

//   return (
//     <CartContext.Provider value={{ cartCount, updateCartCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Dynamically set API URL (dev vs. production)
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://rikakuma.ca/api/cart" // Production URL
      : "http://localhost:5001/api/cart"; // Development URL (server runs on port 5001)

  const updateCartCount = useCallback(async () => {
    try {
      console.log("📦 Fetching cart count from:", API_URL);
      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include", // allow sending cookies if needed
        headers: {
          "Content-Type": "application/json",
          // ❌ DO NOT set "Access-Control-Allow-Origin" in client request
        },
      });

      if (!response.ok) {
        throw new Error(`❌ Failed to fetch cart data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Cart data received:", data);

      const itemCount = data?.item_count || 0;
      setCartCount(itemCount);
    } catch (error) {
      console.error("🔥 Error fetching cart count:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    updateCartCount();
  }, [updateCartCount]); // fix ESLint warning by including updateCartCount

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
