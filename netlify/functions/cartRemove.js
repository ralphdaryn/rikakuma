const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
    const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const { cartId, lineId } = JSON.parse(event.body);

    if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
      console.error("🚨 Missing Shopify API credentials!");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing Shopify API credentials" }),
      };
    }

    if (!cartId || !lineId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing cartId or lineId" }),
      };
    }

    console.log("🗑️ Removing item from Shopify cart...");

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
          cartLinesRemove(cartId: "${cartId}", lineIds: ["${lineId}"]) {
            userErrors {
              message
            }
            cart {
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
            }
          }
        }`,
        }),
      }
    );

    const data = await response.json();

    if (data.errors || data.data?.cartLinesRemove?.userErrors?.length) {
      console.error(
        "❌ Shopify API Error:",
        data.errors || data.data?.cartLinesRemove?.userErrors
      );
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to remove item",
          details: data.errors || data.data?.cartLinesRemove?.userErrors,
        }),
      };
    }

    console.log("✅ Item removed from Shopify cart!");

    return {
      statusCode: 200,
      body: JSON.stringify(data.data.cartLinesRemove.cart),
    };
  } catch (error) {
    console.error("❌ Cart API Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};