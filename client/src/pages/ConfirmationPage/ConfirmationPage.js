import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/getCheckoutSession?session_id=${sessionId}`
        );
        const data = await response.json();
        setSessionData(data);
      } catch (err) {
        console.error("Error fetching session:", err);
      }
    };

    if (sessionId) fetchSession();
  }, [sessionId]);

  if (!sessionData) return <div className="p-4">Loading your order...</div>;

  const { customer_details, amount_total, id } = sessionData;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎉 Thanks for your order!</h1>
      <p className="mb-2">
        Order ID: <strong>{id}</strong>
      </p>
      <p className="mb-4">
        A confirmation email was sent to{" "}
        <strong>{customer_details.email}</strong>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Shipping Info:</h2>
      <p>{customer_details.name}</p>
      <p>
        {customer_details.address.line1}, {customer_details.address.city}
      </p>
      <p>{customer_details.address.postal_code}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Total Paid:</h2>
      <p className="font-bold text-lg">${(amount_total / 100).toFixed(2)}</p>
    </div>
  );
};

export default ConfirmationPage;