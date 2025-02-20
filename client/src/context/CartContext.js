import { createContext, useState, useContext, useEffect } from "react";

// Create Context
const CartContext = createContext();

// ✅ Create Cart Provider
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // ✅ Function to update cart count from Shopify API
  const updateCartCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart"); // ✅ Fetch from our Express backend
      const data = await response.json();

      if (data && data.items) {
        const totalItems = data.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(totalItems);
      }
    } catch (error) {
      console.error("🔥 Failed to fetch cart count:", error);
    }
  };

  useEffect(() => {
    updateCartCount(); // ✅ Load cart count on mount
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook to use CartContext
export const useCart = () => useContext(CartContext);
