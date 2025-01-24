import "./Shop.scss";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/shopifyClient";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      console.log(data);
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <div className="shop">
      <h1 className="shop__title">Products</h1>
      <div className="shop__container">
        {products.map((product) => (
          <div className="shop__card" key={product.id}>
            <h2 className="shop__name">{product.title}</h2>
            {product.images.edges[0]?.node.src ? (
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
              ${product.priceRange.minVariantPrice.amount}{" "}
              {product.priceRange.minVariantPrice.currencyCode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
