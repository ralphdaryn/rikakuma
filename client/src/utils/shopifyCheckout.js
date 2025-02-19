// import axios from "axios";

// const SHOPIFY_STORE_DOMAIN = "vd871k-pc.myshopify.com"; // Shopify store domain
// const SHOPIFY_ACCESS_TOKEN = "fbcd43b1623533712a01dcbc907bbe1d"; // Storefront API token

// export const createCheckout = async (variantId, quantity = 1) => {
//   if (!variantId) {
//     console.error("❌ Error: No variant ID provided for checkout.");
//     alert("Error: No variant ID found for checkout.");
//     return;
//   }

//   console.log(
//     `🛒 Creating checkout for Variant ID: ${variantId}, Quantity: ${quantity}`
//   );

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
//           field
//           code
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

//     console.log("✅ Shopify Checkout Response:", response.data);

//     const checkout = response.data?.data?.checkoutCreate?.checkout;
//     const errors = response.data?.data?.checkoutCreate?.checkoutUserErrors;

//     if (checkout?.webUrl) {
//       console.log("🔗 Redirecting to Checkout:", checkout.webUrl);
//       window.location.href = checkout.webUrl; // ✅ Redirects user to checkout page
//     } else {
//       console.error("🚨 Checkout Error Details:", errors);
//       alert(
//         `Checkout Error: ${errors
//           ?.map((e) => `${e.message} (Field: ${e.field})`)
//           .join(", ")}`
//       );
//     }
//   } catch (error) {
//     console.error(
//       "🔥 Error creating checkout:",
//       error.response?.data || error.message
//     );
//     alert("An error occurred while processing the checkout. Please try again.");
//   }
// };

export const createCheckout = async (variantId, quantity = 1) => {
  if (!variantId) {
    console.error("❌ Error: No variant ID provided for checkout.");
    alert("Error: No variant ID found for checkout.");
    return;
  }

  // ✅ Extract only the numeric Variant ID from Shopify's Global ID format (gid://shopify/ProductVariant/123456789)
  const variantIdNumeric = variantId.replace(
    "gid://shopify/ProductVariant/",
    ""
  );

  console.log(
    `🛒 Redirecting to Shopify cart with Variant ID: ${variantIdNumeric}, Quantity: ${quantity}`
  );

  // ✅ Correct Shopify Cart URL format
  const shopifyCartUrl = `https://vd871k-pc.myshopify.com/cart/${variantIdNumeric}:${quantity}`;

  // ✅ Redirect user to Shopify's cart page
  window.location.href = shopifyCartUrl;
};
