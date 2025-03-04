const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
    const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const { cartId } = JSON.parse(event.body);

    if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
      console.error("🚨 Missing Shopify API credentials!");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Shopify API credentials" }),
      };
    }

    if (!cartId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing cart ID" }),
      };
    }

    // ✅ Debug mode toggle
    const DEBUG_MODE = process.env.DEBUG === "true";
    if (DEBUG_MODE) console.log("📦 Fetching Shopify cart...");

    const response = await fetch(
      `${SHOPIFY_STORE_URL}/api/2023-10/graphql.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query {
          cart(id: "${cartId}") {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }`,
        }),
      }
    );

    const data = await response.json();

    if (data.errors || !data.data?.cart) {
      console.error("❌ Shopify API Error:", data.errors);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to retrieve cart data",
          details: data.errors,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.data.cart),
    };
  } catch (error) {
    console.error("❌ Cart API Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};