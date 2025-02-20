// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// const PORT = process.env.PORT || 5001; // Changed to port 5001 to avoid conflict

// // ✅ Allow CORS for frontend (http://localhost:3000)
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Ensure this matches the frontend port
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS here
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ Handle preflight requests (important)
// app.options("*", cors()); // This line ensures preflight OPTIONS requests are allowed

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Shopify Credentials
// const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
// const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

// // ✅ Cart API (Fix CORS issue)
// app.get("/api/cart", async (req, res) => {
//   try {
//     console.log("📦 Fetching cart details...");

//     // Ensure the Shopify Store URL and Access Token are correct
//     console.log("Shopify Store URL:", SHOPIFY_STORE_URL);
//     console.log("Shopify Access Token:", SHOPIFY_ACCESS_TOKEN);

//     const response = await axios.get(`${SHOPIFY_STORE_URL}/cart.json`, {
//       headers: {
//         "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("✅ Cart data fetched successfully.");
//     res.set("Access-Control-Allow-Origin", "http://localhost:3000"); // Explicitly allow frontend
//     res.json(response.data);
//   } catch (error) {
//     console.error("🔥 Error fetching cart:", error.message);
//     console.error(error.response?.data); // Print detailed error
//     res.status(500).json({ error: "Failed to fetch cart" });
//   }
// });

// // ✅ Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// server/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000; // or 5001 if you prefer

// ✅ Allow cross-origin requests from local dev & production domains
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local dev front-end
      "https://rikakuma.ca", // Production front-end
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight OPTIONS requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Shopify credentials from .env
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL; // e.g., https://your-shop.myshopify.com
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // e.g., store-front access token

// ✅ Cart API endpoint
app.get("/api/cart", async (req, res) => {
  try {
    console.log("📦 Fetching cart details...");
    const response = await axios.get(`${SHOPIFY_STORE_URL}/cart.json`, {
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Cart data fetched successfully.");
    // The 'cors()' middleware automatically sets Access-Control-Allow-Origin
    res.json(response.data);
  } catch (error) {
    console.error(
      "🔥 Error fetching cart:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
