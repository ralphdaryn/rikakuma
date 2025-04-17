const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mysql = require("mysql2/promise");
require("dotenv").config({ path: "../../.env" });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.handler = async (event) => {
  const sessionId = event.queryStringParameters.session_id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details"],
    });

    // 💾 Extract order data
    const orderId = session.id;
    const customerName = session.customer_details?.name || "No Name";
    const customerEmail = session.customer_details?.email || "No Email";
    const totalAmount = (session.amount_total / 100).toFixed(2);

    // 🔒 If you haven't created a shipment yet
    const shipmentId = null;
    const trackingUrl = null;
    const labelUrl = null;

    // ✅ Save to MySQL
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
    console.error("Error fetching session:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve session" }),
    };
  }
};