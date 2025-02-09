import axios from "axios";

const SHOPIFY_STORE_DOMAIN = "vd871k-pc.myshopify.com"; 
const SHOPIFY_ACCESS_TOKEN = "fbcd43b1623533712a01dcbc907bbe1d"; 

export const createCheckout = async (variantId, quantity = 1) => {
  const mutation = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${variantId}", quantity: ${quantity} }]
      }) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          message
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2023-04/graphql.json`,
      { query: mutation },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const checkout = response.data.data.checkoutCreate.checkout;
    if (checkout) {
      window.location.href = checkout.webUrl; // Redirect to checkout page
    } else {
      console.error("Checkout Error:", response.data.data.checkoutCreate.checkoutUserErrors);
    }
  } catch (error) {
    console.error("Error creating checkout:", error);
  }
};
