import "./Shop.scss";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/shopifyClient";
import { createCheckout } from "../../utils/shopifyCheckout"; // Import checkout function

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      console.log("Fetched Products:", data); // Debugging Step
      setProducts(data);
    };

    getProducts();
  }, []);

  const handleCheckout = async (variantId) => {
    if (!variantId) {
      console.error("No variant ID found for product.");
      return; // Prevent checkout if no variant is found
    }
    setLoading(true);
    await createCheckout(variantId, 1);
    setLoading(false);
  };

  return (
    <div className="shop">
      <h1 className="shop__title">Products</h1>
      <div className="shop__container">
        {products.length > 0 ? (
          products.map((product) => {
            const hasVariants = product?.variants?.edges?.length > 0;
            const variantId = hasVariants ? product.variants.edges[0]?.node?.id : null;

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

                {hasVariants ? (
                  <button
                    className="shop__checkout-button"
                    onClick={() => handleCheckout(variantId)}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Buy Now"}
                  </button>
                ) : (
                  <p className="shop__out-of-stock">Out of stock</p>
                )}
              </div>
            );
          })
        ) : (
          <p className="shop__loading">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Shop;