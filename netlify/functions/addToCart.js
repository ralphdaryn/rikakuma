const fetch = require("node-fetch");

const SHOPIFY_STORE_URL = "https://vd871k-pc.myshopify.com";

exports.handler = async (event) => {
  try {
    const { variantId, quantity } = JSON.parse(event.body);

    if (!variantId || isNaN(variantId)) {
      throw new Error("Missing or invalid variantId");
    }

    console.log("🛍️ Adding Variant ID:", variantId, "Quantity:", quantity);

    const payload = {
      items: [
        {
          id: Number(variantId), // Ensure it's a valid number
          quantity: quantity || 1,
        },
      ],
    };

    console.log("📦 Payload being sent:", JSON.stringify(payload));

    const response = await fetch(`${SHOPIFY_STORE_URL}/cart/add.js`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text(); // Read raw response

    if (!response.ok) {
      console.error("🚨 Shopify API Error:", response.status, responseText);
      throw new Error(`Shopify API Error: ${response.status} ${responseText}`);
    }

    const cartData = JSON.parse(responseText);
    console.log("✅ Item added to cart successfully:", cartData);

    return {
      statusCode: 200,
      body: JSON.stringify(cartData),
    };
  } catch (error) {
    console.error("❌ Error in addToCart function:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};