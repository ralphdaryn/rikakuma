import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const API_URL = "/.netlify/functions/shopifyCart";

  const updateCartCount = async () => {
    try {
      console.log(`📦 Fetching cart count from: ${API_URL}`);

      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("❌ Failed to fetch cart data");

      const data = await response.json();
      console.log("✅ Cart data received:", data);

      const itemCount = data?.item_count || 0;
      setCartCount(itemCount);
    } catch (error) {
      console.error("🔥 Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
