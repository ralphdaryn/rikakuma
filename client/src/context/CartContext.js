import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await fetch("https://rikakuma.ca/cart.js", {
        credentials: "include",
      });
      const cartData = await response.json();
      console.log("🛒 Shopify Cart Data:", cartData);
      setCart(cartData);
    } catch (error) {
      console.error("❌ Error fetching Shopify cart:", error);
    }
  };

  const addItemToCart = async (variantId, quantity = 1) => {
    try {
      console.log("🛍️ Adding item to cart via Netlify function...");

      const response = await fetch("/.netlify/functions/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("✅ Item added:", data);

      // Fetch updated cart
      fetchCart();
    } catch (error) {
      console.error("❌ Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
