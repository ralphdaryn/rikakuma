require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from localhost:8888
app.use(cors({ origin: "http://localhost:8888" }));
app.use(express.json());

// Shopify credentials from .env file
const SHOPIFY_STORE_URL = "https://vd871k-pc.myshopify.com";
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

// ✅ API Route to get Shopify cart details
app.get("/api/cart", async (req, res) => {
  try {
    const response = await axios.get(`${SHOPIFY_STORE_URL}/cart.json`, {
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "🔥 Error fetching cart:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
