const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
    const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

    if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
      console.error("🚨 Missing Shopify API credentials!");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Shopify API credentials" }),
      };
    }

    console.log("🛒 Creating a new Shopify cart...");

    const response = await fetch(
      `${SHOPIFY_STORE_URL}/api/2023-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `mutation {
          cartCreate(input: {}) {
            cart {
              id
            }
            userErrors {
              message
            }
          }
        }`,
        }),
      }
    );

    const data = await response.json();

    if (data.errors || !data.data?.cartCreate?.cart?.id) {
      console.error(
        "❌ Shopify API Error:",
        data.errors || data.data?.cartCreate?.userErrors
      );
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to create cart",
          details: data.errors || data.data?.cartCreate?.userErrors,
        }),
      };
    }

    console.log("✅ Shopify Cart Created:", data.data.cartCreate.cart.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: data.data.cartCreate.cart.id }),
    };
  } catch (error) {
    console.error("❌ Cart API Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};