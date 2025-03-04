const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const response = await fetch(
      "https://rikakuma.ca/api/2023-10/graphql.json",
      {
        method: event.httpMethod,
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
        },
        body: event.body,
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Shopify API" }),
    };
  }
};