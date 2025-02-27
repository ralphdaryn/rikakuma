const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { variantId, quantity } = JSON.parse(event.body);
    console.log("🛍️ Received Variant ID:", variantId);

    const response = await fetch(
      `https://YOUR_SHOPIFY_STORE.myshopify.com/cart/add.js`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: variantId, quantity: quantity || 1 }),
      }
    );

    const cartData = await response.json();
    return { statusCode: 200, body: JSON.stringify(cartData) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};