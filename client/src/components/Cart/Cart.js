import { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.scss";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/.netlify/functions/shopifyCart");
        setCart(response.data);
      } catch (error) {
        console.error("🔥 Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (!cart || cart.item_count === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.product_title} />
            <div>
              <h3>{item.product_title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${(item.final_line_price / 100).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${(cart.total_price / 100).toFixed(2)}</h3>
      <a href="https://your-shopify-store.myshopify.com/cart">
        <button>Proceed to Checkout</button>
      </a>
    </div>
  );
};

export default Cart;
