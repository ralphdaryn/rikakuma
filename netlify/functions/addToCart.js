const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    console.log("🛍️ Adding item to Shopify cart...");

    const body = JSON.parse(event.body);
    const { variantId, quantity } = body;

    if (!variantId || !quantity) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing variantId or quantity" }),
      };
    }

    // Shopify Public Cart API (No Authentication Required)
    const response = await fetch("https://rikakuma.ca/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: variantId, quantity }),
      credentials: "include",
    });

    const data = await response.json();
    console.log("✅ Item added to cart:", data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
