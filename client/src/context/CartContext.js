import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8888";

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(
    localStorage.getItem("shopify_cart_id") || null
  );
  const [cart, setCart] = useState(null);
  const [cartFetched, setCartFetched] = useState(false);

  // ✅ Use useCallback to prevent unnecessary re-renders
  const createCart = useCallback(async () => {
    if (cartId) return;

    console.log("🛒 Creating a new Shopify cart...");

    try {
      const response = await fetch(
        `${API_URL}/.netlify/functions/shopifyCreateCart`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) throw new Error("Failed to create cart");

      const data = await response.json();
      if (!data?.id) throw new Error("Cart ID not found");

      setCartId(data.id);
      localStorage.setItem("shopify_cart_id", data.id);
      console.log("✅ Shopify Cart Created:", data.id);
    } catch (error) {
      console.error("❌ Error creating Shopify cart:", error);
    }
  }, [cartId]);

  // ✅ Fetch Shopify Cart
  const fetchCart = useCallback(async () => {
    if (!cartId || cartFetched) return;

    console.log("📦 Fetching Shopify cart...");

    try {
      setCartFetched(true);
      const response = await fetch(`${API_URL}/.netlify/functions/getCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });

      if (!response.ok) throw new Error("Failed to fetch cart");

      const cartData = await response.json();
      console.log("✅ Shopify Cart Data:", cartData);
      setCart(cartData);
    } catch (error) {
      console.error("❌ Error fetching Shopify cart:", error);
    }
  }, [cartId, cartFetched]);

  // ✅ Remove Item from Shopify Cart
  const removeFromCart = async (lineId) => {
    if (!cartId || !lineId) return;

    console.log("🗑️ Removing item from cart...");

    try {
      const response = await fetch(`${API_URL}/.netlify/functions/cartRemove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, lineId }),
      });

      if (!response.ok) throw new Error("Failed to remove item");

      console.log("✅ Item removed from cart!");
      fetchCart(); // Refresh the cart
    } catch (error) {
      console.error("❌ Error removing item from cart:", error);
    }
  };

  // ✅ useEffect to create the cart
  useEffect(() => {
    createCart();
  }, [createCart]); // ✅ Fix: Include `createCart`

  // ✅ useEffect to fetch the cart
  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // ✅ Fix: Include `fetchCart`

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, createCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};