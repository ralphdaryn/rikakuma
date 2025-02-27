const axios = require("axios");

exports.handler = async (event, context) => {
  console.log("📦 Fetching cart details...");

  const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
  const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Shopify credentials" }),
    };
  }

  try {
    // Make sure the API endpoint is correct
    const response = await axios.get(`${SHOPIFY_STORE_URL}/cart.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Cart data fetched successfully:", response.data);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(
      "🔥 Error fetching cart:",
      error.response?.data || error.message
    );

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch cart",
        details: error.message,
      }),
    };
  }
};
