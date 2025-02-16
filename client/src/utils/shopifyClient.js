import axios from "axios";

const SHOPIFY_STORE_DOMAIN = "vd871k-pc.myshopify.com"; // Your Shopify store
const SHOPIFY_ACCESS_TOKEN = "fbcd43b1623533712a01dcbc907bbe1d"; // Storefront API token

const shopifyClient = axios.create({
  baseURL: `https://${SHOPIFY_STORE_DOMAIN}/api/2023-04/graphql.json`,
  headers: {
    "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
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
            availableForSale
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
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale  # ✅ Keep this to check stock status
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

    if (response.data.errors) {
      console.error("🚨 Shopify API Error:", JSON.stringify(response.data.errors, null, 2));
    }

    console.log("✅ Full Shopify API Response:", response.data);

    return response.data?.data?.products?.edges.map((edge) => edge.node) || [];
  } catch (error) {
    console.error("🔥 Error fetching products:", error.response?.data || error.message);
    return [];
  }
};
