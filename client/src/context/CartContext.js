import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8888";

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(
    localStorage.getItem("shopify_cart_id") || null
  );
  const [cart, setCart] = useState(null);
  const [cartFetched, setCartFetched] = useState(false);

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

  const fetchCart = useCallback(async () => {
    if (!cartId || cartFetched) return;

    try {
      setCartFetched(true);
      const response = await fetch(`${API_URL}/.netlify/functions/getCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });

      if (!response.ok) throw new Error("Failed to fetch cart");

      const cartData = await response.json();
      setCart(cartData);
    } catch (error) {
      console.error("❌ Error fetching Shopify cart:", error);
    }
  }, [cartId, cartFetched]);

  const removeFromCart = async (lineId) => {
    if (!cartId || !lineId) return;

    try {
      const response = await fetch(`${API_URL}/.netlify/functions/cartRemove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, lineId }),
      });

      if (!response.ok) throw new Error("Failed to remove item");

      fetchCart();
    } catch (error) {
      console.error("❌ Error removing item from cart:", error);
    }
  };

  // ✅ Optimized Polling: Reduced to every 30 sec
  useEffect(() => {
    fetchCart();

    const fetchTimeout = setInterval(() => {
      fetchCart();
    }, 30000);

    return () => clearInterval(fetchTimeout);
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, createCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};