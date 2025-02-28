export const addToCart = async (variantId) => {
  try {
    console.log("🛒 Adding item to cart:", variantId);

    const response = await fetch("/.netlify/functions/shopifyAddToCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variantId, quantity: 1 }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add item: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Item added successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
  }
};
