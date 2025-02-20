export const addToCart = async (variantId, quantity = 1) => {
  if (!variantId) {
    console.error("❌ Error: No variant ID provided for checkout.");
    alert("Error: No variant ID found for checkout.");
    return;
  }

  const variantIdNumeric = variantId.replace(
    "gid://shopify/ProductVariant/",
    ""
  );

  console.log(
    `🛒 Adding product to Shopify cart: Variant ID: ${variantIdNumeric}, Quantity: ${quantity}`
  );

  try {
    const checkoutUrl = `https://vd871k-pc.myshopify.com/cart/add?id=${variantIdNumeric}&quantity=${quantity}&return_to=/checkout`;

    // Redirect user to Shopify checkout after adding product
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error("🔥 Failed to add to cart:", error);
    alert("Failed to add product to cart.");
  }
};
