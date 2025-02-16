import "./Shop.scss";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/shopifyClient";
import { createCheckout } from "../../utils/shopifyCheckout"; // Import checkout function

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(null); // Track loading per product

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        console.log("Fetched Products:", data); // Debugging Step
        if (!data || data.length === 0) {
          console.warn("⚠️ No products found in API response.");
        }
        setProducts(data || []); // Ensure an empty array is set if data is null
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleCheckout = async (variantId) => {
    if (!variantId) {
      console.error("No variant ID found for product.");
      return;
    }
    setCheckoutLoading(variantId);
    try {
      await createCheckout(variantId, 1);
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setCheckoutLoading(null);
    }
  };

  return (
    <div className="shop">
      <h1 className="shop__title">Products</h1>

      {loading ? (
        <p className="shop__loading">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="shop__container">
          {products.map((product) => {
            const hasVariants = product?.variants?.edges?.length > 0;
            const variantNode = hasVariants
              ? product.variants.edges[0].node
              : null;
            const variantId = variantNode?.id;
            const isAvailable = variantNode?.availableForSale; // ✅ New way to check stock

            return (
              <div className="shop__card" key={product.id}>
                <h2 className="shop__name">{product.title}</h2>
                {product.images?.edges?.[0]?.node?.src ? (
                  <img
                    className="shop__image"
                    src={product.images.edges[0].node.src}
                    alt={product.title}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <p className="shop__description">{product.description}</p>
                <div className="shop__price">
                  ${product?.priceRange?.minVariantPrice?.amount}{" "}
                  {product?.priceRange?.minVariantPrice?.currencyCode}
                </div>

                {isAvailable ? (
                  <button
                    className="shop__checkout-button"
                    onClick={() => handleCheckout(variantId)}
                    disabled={checkoutLoading === variantId}
                  >
                    {checkoutLoading === variantId
                      ? "Processing..."
                      : "Buy Now"}
                  </button>
                ) : (
                  <p className="shop__out-of-stock">Out of stock</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="shop__no-products">No products available.</p>
      )}
    </div>
  );
};

export default Shop;