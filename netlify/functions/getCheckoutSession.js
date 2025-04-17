const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mysql = require("mysql2/promise");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.handler = async (event) => {
  const sessionId = event.queryStringParameters.session_id;

  try {
    console.log("➡️ SESSION ID RECEIVED:", sessionId);
    console.log(
      "🔑 Using STRIPE KEY:",
      process.env.STRIPE_SECRET_KEY.startsWith("sk_test") ? "TEST" : "LIVE"
    );

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details"],
    });

    console.log("✅ Stripe Session:", session);

    const orderId = session.id;
    const customerName = session.customer_details?.name || "No Name";
    const customerEmail = session.customer_details?.email || "No Email";
    const totalAmount = (session.amount_total / 100).toFixed(2);

    const shipmentId = null;
    const trackingUrl = null;
    const labelUrl = null;

    await pool.execute(
      `INSERT INTO orders (order_id, customer_name, customer_email, shipment_id, tracking_url, label_url, total_amount)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        customerName,
        customerEmail,
        shipmentId,
        trackingUrl,
        labelUrl,
        totalAmount,
      ]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(session),
    };
  } catch (error) {
    console.error("🔥 ERROR retrieving session or saving to DB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve session" }),
    };
  }
};
