const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const SHOPIFY_API_URL =
    "https://rikakuma.myshopify.com/api/2023-10/graphql.json";
  const SHOPIFY_ACCESS_TOKEN = "your-storefront-access-token"; // 🔹 Replace this!

  try {
    const body = JSON.parse(event.body);
    const { checkoutId, variantId, quantity } = body;

    if (!checkoutId || !variantId || !quantity) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing checkoutId, variantId, or quantity",
        }),
      };
    }

    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation {
            checkoutLineItemsAdd(checkoutId: "${checkoutId}", lineItems: [{ quantity: ${quantity}, variantId: "${variantId}" }]) {
              checkout {
                id
                webUrl
                lineItems(first: 10) {
                  edges {
                    node {
                      title
                      quantity
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();

    if (!data?.data?.checkoutLineItemsAdd?.checkout) {
      throw new Error("Failed to add item to checkout");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        checkoutId: data.data.checkoutLineItemsAdd.checkout.id,
        webUrl: data.data.checkoutLineItemsAdd.checkout.webUrl,
      }),
    };
  } catch (error) {
    console.error("❌ Error adding item to checkout:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to add item to checkout" }),
    };
  }
};
