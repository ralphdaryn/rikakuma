import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    item_count: 0,
    items: [],
    total_price: 0,
  });

  const fetchCart = async () => {
    try {
      const response = await fetch("/.netlify/functions/shopifyCart");
      const data = await response.json();
      console.log("🛒 Cart Data:", data);
      setCart(data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook to use Cart
export const useCart = () => {
  return useContext(CartContext);
};