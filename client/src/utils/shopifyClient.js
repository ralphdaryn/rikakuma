import axios from "axios";

const shopifyClient = axios.create({
  baseURL: `https://${process.env.REACT_APP_SHOPIFY_DOMAIN}/api/2023-01/graphql.json`,
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

export default shopifyClient;

export const fetchProducts = async () => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyClient.post("", { query });
    return response.data.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
