import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
  const { cart, fetchCart } = useContext(CartContext);

  useEffect(() => {
    console.log("📦 Fetching cart on mount...");
    fetchCart();

    // Re-fetch the cart after 1 second in case Shopify hasn't updated yet
    const fetchTimeout = setTimeout(() => {
      console.log("🔄 Re-fetching cart for updates...");
      fetchCart();
    }, 1000);

    return () => clearTimeout(fetchTimeout); // Cleanup timeout on unmount
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

      {cart?.items?.length > 0 ? (
        <ul className="cart__items">
          {cart.items.map((item) => (
            <li key={item.id} className="cart__item">
              <img src={item.image} alt={item.title} className="cart__image" />
              <div className="cart__details">
                <h3>{item.title}</h3>
                <p>{item.product_description}</p>
                <p>Price: ${(item.price / 100).toFixed(2)} CAD</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3>Total: ${(cart.total_price / 100).toFixed(2)} CAD</h3>

      <Link to="/checkout">
        <button className="cart__checkout-button">Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
