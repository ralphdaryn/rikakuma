// export const addToCart = async (variantId, quantity = 1) => {
//   if (!variantId) {
//     console.error("❌ Error: No variant ID provided for cart.");
//     alert("Error: No variant ID found for cart.");
//     return;
//   }

//   // Extract numeric Variant ID
//   const variantIdNumeric = variantId.replace(
//     "gid://shopify/ProductVariant/",
//     ""
//   );

//   console.log(
//     `🛒 Adding product to Shopify cart: Variant ID: ${variantIdNumeric}, Quantity: ${quantity}`
//   );

//   try {
//     // Shopify Add to Cart URL
//     const cartUrl = `https://vd871k-pc.myshopify.com/cart/add?id=${variantIdNumeric}&quantity=${quantity}`;

//     // Send a request to add the product to the cart without redirecting
//     await fetch(cartUrl, { method: "GET", mode: "no-cors" });

//     alert("✅ Product added to cart!");
//   } catch (error) {
//     console.error("🔥 Failed to add to cart:", error);
//     alert("Failed to add product to cart.");
//   }
// };

// // View cart function
// export const viewCart = () => {
//   const cartUrl = `https://vd871k-pc.myshopify.com/cart`;
//   console.log("🔗 Redirecting to Shopify Cart:", cartUrl);
//   window.location.href = cartUrl;
// };

// // Buy now function (Add to cart first, then go to checkout)
// export const buyNow = async (variantId, quantity = 1) => {
//   if (!variantId) {
//     console.error("❌ Error: No variant ID provided for checkout.");
//     alert("Error: No variant ID found for checkout.");
//     return;
//   }

//   // Extract numeric Variant ID
//   const variantIdNumeric = variantId.replace(
//     "gid://shopify/ProductVariant/",
//     ""
//   );

//   console.log(
//     `🛒 Adding product to Shopify cart: Variant ID: ${variantIdNumeric}, Quantity: ${quantity}`
//   );

//   try {
//     // Shopify Add to Cart URL
//     const cartUrl = `https://vd871k-pc.myshopify.com/cart/add?id=${variantIdNumeric}&quantity=${quantity}`;

//     console.log("🔗 Adding to Shopify Cart:", cartUrl);

//     // Make a request to add product to cart first
//     await fetch(cartUrl, { method: "GET", credentials: "include" });

//     // ✅ Redirect to Shopify Checkout
//     const checkoutUrl = `https://vd871k-pc.myshopify.com/cart`;
//     console.log("🔗 Redirecting to Shopify Checkout:", checkoutUrl);

//     // Ensure the redirection happens after the cart is updated
//     setTimeout(() => {
//       window.location.href = checkoutUrl;
//     }, 500); // Adjust delay if needed
//   } catch (error) {
//     console.error("🔥 Checkout process failed:", error);
//     alert("Checkout failed. Please try again.");
//   }
// };

export const addToCart = async (variantId, quantity = 1, updateCartCount) => {
  if (!variantId) {
    console.error("❌ Error: No variant ID provided for cart.");
    alert("Error: No variant ID found for cart.");
    return;
  }

  // Extract numeric Variant ID
  const variantIdNumeric = variantId.replace(
    "gid://shopify/ProductVariant/",
    ""
  );

  console.log(
    `🛒 Adding product to Shopify cart: Variant ID: ${variantIdNumeric}, Quantity: ${quantity}`
  );

  try {
    // Shopify Add to Cart URL
    const cartUrl = `https://vd871k-pc.myshopify.com/cart/add?id=${variantIdNumeric}&quantity=${quantity}`;

    // Send a request to add the product to the cart without redirecting
    await fetch(cartUrl, { method: "GET", mode: "no-cors" });

    // ✅ Call `updateCartCount` if provided
    if (updateCartCount) {
      updateCartCount();
    }

    alert("✅ Product added to cart!");
  } catch (error) {
    console.error("🔥 Failed to add to cart:", error);
    alert("Failed to add product to cart.");
  }
};