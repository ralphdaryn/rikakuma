import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.scss";

const Cart = () => {
  const { cart, fetchCart } = useContext(CartContext);

  useEffect(() => {
    console.log("📦 Fetching cart on mount...");
    fetchCart();

    const fetchTimeout = setInterval(() => {
      console.log("🔄 Re-fetching cart for updates...");
      fetchCart();
    }, 5000); // Poll every 5 seconds for updates

    return () => clearInterval(fetchTimeout);
  }, [fetchCart]);

  useEffect(() => {
    console.log("🛒 Cart state updated:", cart);
  }, [cart]);

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>

      {Array.isArray(cart?.items) && cart.items.length > 0 ? (
        <ul className="cart__items">
          {cart.items.map((item) => (
            <li key={item.id} className="cart__item">
              <img
                src={item.image}
                alt={item.product_title}
                className="cart__image"
              />
              <div className="cart__details">
                <h3>{item.product_title}</h3>
                <p>{item.product_description || "No description available"}</p>
                <p>Price: ${(item.final_price / 100).toFixed(2)} CAD</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3>
        Total: $
        {cart.total_price ? (cart.total_price / 100).toFixed(2) : "0.00"} CAD
      </h3>

      <a href="https://rikakuma.ca/cart">
        <button className="cart__checkout-button">View Shopify Cart</button>
      </a>
    </div>
  );
};

export default Cart;
