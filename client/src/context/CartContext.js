import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  // ✅ Fetch Cart from Netlify function instead of Shopify directly
  const fetchCart = useCallback(async () => {
    try {
      console.log("🔄 Fetching cart...");

      const response = await fetch("/.netlify/functions/getCart"); // Calls Netlify function

      if (!response.ok) {
        throw new Error(
          `Cart API Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("🛒 Cart Data:", data);

      setCart(data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error.message);
    }
  }, []);

  // ✅ Add item using Netlify function
  const addItemToCart = async (variantId) => {
    try {
      if (!variantId || isNaN(variantId)) {
        console.error("❌ Variant ID is missing or invalid!", variantId);
        return;
      }

      console.log(`🛍️ Adding product ${variantId} to cart...`);

      const response = await fetch("/.netlify/functions/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: Number(variantId), quantity: 1 }), // Ensure it's a valid number
      });

      const responseText = await response.text();
      console.log("🔍 Raw Response:", responseText);

      if (!response.ok) {
        console.error("❌ Shopify API Error:", response.status, responseText);
        throw new Error(`Failed to add to cart: ${response.statusText}`);
      }

      console.log("✅ Item added successfully!");
      fetchCart(); // Refresh cart
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook for Cart
export const useCart = () => useContext(CartContext);
