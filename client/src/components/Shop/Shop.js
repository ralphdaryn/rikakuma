import "./Shop.scss";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/shopifyClient";
import { addToCart } from "../../utils/shopifyCheckout";
import { useCart } from "../../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { updateCartCount } = useCart(); // ✅ Now used properly

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        console.log("✅ Fetched Products:", data);

        if (!data || data.length === 0) {
          console.warn("⚠️ No products found in API response.");
        }

        setProducts(data || []);
      } catch (error) {
        console.error("🔥 Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const addToCartHandler = async (variantId) => {
    await addToCart(variantId);
    setTimeout(() => updateCartCount(), 1000); // Delay cart count update slightly
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
            const isAvailable = variantNode?.availableForSale;

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
                    className="shop__cart-button"
                    onClick={() => addToCartHandler(variantId)}
                  >
                    Add to Cart 🛒
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
