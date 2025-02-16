// import axios from "axios";

// const SHOPIFY_STORE_DOMAIN = "vd871k-pc.myshopify.com"; 
// const SHOPIFY_ACCESS_TOKEN = "fbcd43b1623533712a01dcbc907bbe1d"; 

// export const createCheckout = async (variantId, quantity = 1) => {
//   const mutation = `
//     mutation {
//       checkoutCreate(input: {
//         lineItems: [{ variantId: "${variantId}", quantity: ${quantity} }]
//       }) {
//         checkout {
//           id
//           webUrl
//         }
//         checkoutUserErrors {
//           message
//         }
//       }
//     }
//   `;

//   try {
//     const response = await axios.post(
//       `https://${SHOPIFY_STORE_DOMAIN}/api/2023-04/graphql.json`,
//       { query: mutation },
//       {
//         headers: {
//           "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const checkout = response.data.data.checkoutCreate.checkout;
//     if (checkout) {
//       window.location.href = checkout.webUrl; // Redirect to checkout page
//     } else {
//       console.error("Checkout Error:", response.data.data.checkoutCreate.checkoutUserErrors);
//     }
//   } catch (error) {
//     console.error("Error creating checkout:", error);
//   }
// };

import axios from "axios";

const SHOPIFY_STORE_DOMAIN = "vd871k-pc.myshopify.com"; // Your Shopify store domain
const SHOPIFY_ACCESS_TOKEN = "fbcd43b1623533712a01dcbc907bbe1d"; // Your Storefront API token

export const createCheckout = async (variantId, quantity = 1) => {
  if (!variantId) {
    console.error("Error: No variant ID provided for checkout.");
    return;
  }

  console.log(`Creating checkout for variant ID: ${variantId}, Quantity: ${quantity}`);

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

    console.log("Checkout Response:", response.data);

    // Extract checkout data
    const checkout = response.data?.data?.checkoutCreate?.checkout;
    const errors = response.data?.data?.checkoutCreate?.checkoutUserErrors;

    if (checkout && checkout.webUrl) {
      console.log("Redirecting to checkout:", checkout.webUrl);
      window.location.href = checkout.webUrl; // Redirect to Shopify checkout
    } else {
      console.error("Checkout Error:", errors);
      alert("There was an issue with the checkout. Please try again.");
    }
  } catch (error) {
    console.error("Error creating checkout:", error);
    alert("An error occurred while processing the checkout. Please try again.");
  }
};
