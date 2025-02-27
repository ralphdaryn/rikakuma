import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
  const { cart, fetchCart } = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // Added fetchCart as dependency

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {cart.items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Price: ${(item.price / 100).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${(cart.total_price / 100).toFixed(2)}</h3>
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;