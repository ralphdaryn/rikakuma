import "./ConfirmationPage.scss";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log("Session ID:", sessionId);

        const response = await fetch(
          `/.netlify/functions/getCheckoutSession?session_id=${sessionId}`
        );

        const text = await response.text();
        console.log("🔍 Raw response:", text);

        const data = JSON.parse(text);
        setSessionData(data);
      } catch (err) {
        console.error("❌ Error fetching session:", err);
      }
    };

    if (sessionId) fetchSession();
  }, [sessionId]);

  if (!sessionData)
    return <div className="confirmation">Loading your order...</div>;

  const { customer_details = {}, amount_total, id } = sessionData;

  return (
    <div className="confirmation">
      <h1 className="confirmation__heading">🎉 Thanks for your order!</h1>

      <div className="confirmation__order-id">
        <span>Order ID:</span>
        <strong>{id}</strong>
      </div>

      <p className="confirmation__email">
        A confirmation email was sent to{" "}
        <strong>{customer_details?.email || "N/A"}</strong>
      </p>

      <h2 className="confirmation__section-title">Shipping Info:</h2>
      <div className="confirmation__shipping">
        <p>{customer_details?.name || "N/A"}</p>
        <p>
          {customer_details?.address?.line1 || "N/A"},{" "}
          {customer_details?.address?.city || ""}
        </p>
        <p>{customer_details?.address?.postal_code || ""}</p>
      </div>

      <h2 className="confirmation__section-title">Total Paid:</h2>
      <p className="confirmation__total">${(amount_total / 100).toFixed(2)}</p>

      <button className="confirmation__button" onClick={() => navigate("/")}>
        <FaShoppingBag className="confirmation__icon" />
        Continue Shopping
      </button>
    </div>
  );
};

export default ConfirmationPage;
