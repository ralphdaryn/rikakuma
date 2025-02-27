const fetch = require("node-fetch");

const SHOPIFY_STORE_URL = "https://vd871k-pc.myshopify.com";

exports.handler = async () => {
  try {
    console.log("📦 Fetching cart from Shopify...");

    const response = await fetch(`${SHOPIFY_STORE_URL}/cart.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Shopify API Error: ${response.status} ${response.statusText}`
      );
    }

    const cartData = await response.json();
    console.log("🛒 Cart Data:", cartData);

    return {
      statusCode: 200,
      body: JSON.stringify(cartData),
    };
  } catch (error) {
    console.error("❌ Error fetching cart:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};