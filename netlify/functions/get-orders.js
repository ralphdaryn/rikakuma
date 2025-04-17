const mysql = require("mysql2/promise");
require("dotenv").config({ path: "../../.env" }); // Load env from root

console.log("Loaded ENV:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  db: process.env.DB_NAME,
});

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Scorpio06",
    database: "rikakuma_orders",
  });  

exports.handler = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error("Database error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch orders",
        details: error.message,
      }),
    };
  }
};
