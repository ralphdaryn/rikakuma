import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

const ConfirmationPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    const sendLabelAndEmail = async () => {
      try {
        const res = await fetch("/.netlify/functions/create-label-and-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerEmail: "customer@example.com",
            customerName: "Customer Name",
          }),
        });

        const data = await res.json();
        console.log("Label URL:", data.labelUrl);

        clearCart(); // clears the cart after everything
      } catch (err) {
        console.error("Error sending label + email:", err);
      }
    };

    sendLabelAndEmail();
  }, [clearCart]);

  return (
    <div className="confirmation-page">
      <h1>Thanks for your order! 🎉</h1>
      <p>You’ll receive an email with shipping details shortly.</p>
    </div>
  );
};

export default ConfirmationPage;