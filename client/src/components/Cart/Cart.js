import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.scss";

const Cart = () => {
  const { cart, fetchCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    console.log("📦 Fetching cart on mount...");
    fetchCart();
  }, [fetchCart]);

  if (!cart) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>

      {cart?.lines?.edges.length > 0 ? (
        <ul className="cart__items">
          {cart.lines.edges.map(({ node }) => (
            <li key={node.id} className="cart__item">
              <h3>{node.merchandise.product.title}</h3>
              <p>Quantity: {node.quantity}</p>
              <button onClick={() => removeFromCart(node.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3>
        Total: {cart.cost.totalAmount.amount}{" "}
        {cart.cost.totalAmount.currencyCode}
      </h3>

      <a href="https://rikakuma.ca/cart">
        <button className="cart__checkout-button">View Shopify Cart</button>
      </a>
    </div>
  );
};

export default Cart;