import { useState } from "react";
import axios from "axios";
import "./Search.scss";

const SHOPIFY_STORE_DOMAIN = "vd871k-pc.myshopify.com"; 
const SHOPIFY_ACCESS_TOKEN = "fbcd43b1623533712a01dcbc907bbe1d"; 

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (searchTerm) => {
    if (!searchTerm) {
      setProducts([]);
      return;
    }

    setLoading(true);

    const queryString = `
      {
        products(first: 5, query: "${searchTerm}") {
          edges {
            node {
              id
              title
              handle
              featuredImage {
                url
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await axios.post(
        `https://${SHOPIFY_STORE_DOMAIN}/api/2023-04/graphql.json`,
        { query: queryString },
        {
          headers: {
            "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      setProducts(response.data.data.products.edges);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    fetchProducts(searchTerm);
  };

  return (
    <div className="search">
      <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        id="search"
        className="search__input"
        type="search"
        placeholder="Type to search..."
        aria-label="Search"
        value={query}
        onChange={handleInputChange}
      />
      {loading && <p className="search__loading">Loading...</p>}

      {/* Display search results */}
      {products.length > 0 && (
        <div className="search__results">
          {products.map(({ node }) => (
            <a
              key={node.id}
              href={`https://${SHOPIFY_STORE_DOMAIN}/products/${node.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="search__result-item"
            >
              <img src={node.featuredImage?.url} alt={node.title} width="50" />
              <div>
                <p className="search__result-title">{node.title}</p>
                <p className="search__result-price">
                  {node.variants.edges[0].node.price.amount}{" "}
                  {node.variants.edges[0].node.price.currencyCode}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;