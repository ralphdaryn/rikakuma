import { useCart } from "../../context/CartContext";
import "./Cart.scss";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    cartCount,
    increaseQty,
    decreaseQty,
  } = useCart();

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "/.netlify/functions/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err.message);
      alert("Something went wrong during checkout.");
    }
  };

  const handleCreateShipment = async () => {
    try {
      const res = await fetch("/.netlify/functions/create-shipment");
      const data = await res.json();
      console.log("Shipment created:", data);
      alert("Test shipment created. Check the console for details.");
    } catch (err) {
      console.error("Shipment error:", err.message);
      alert("Failed to create test shipment.");
    }
  };

  return (
    <div className="cart-page">
      <h2 className="cart-page__title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="cart-page__empty">is empty 😔</p>
      ) : (
        <>
          <div className="cart-page__list">
            {cart.map((item, index) => (
              <div className="cart-page__item" key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-page__image"
                />
                <div className="cart-page__info">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <div className="cart-page__qty">
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                  <button
                    className="cart-page__remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-page__summary">
            <p>Total Items: {cartCount}</p>
            <p>Subtotal: ${getTotalPrice()}</p>
            <div className="cart-page__buttons">
              <button className="cart-page__clear" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="cart-page__checkout" onClick={handleCheckout}>
                Checkout
              </button>
              <button
                className="cart-page__checkout cart-page__shipment-test"
                onClick={handleCreateShipment}
              >
                Test Shipment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
