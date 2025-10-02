// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mysql from "mysql2";

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // e.g., remote host from Render/PlanetScale
  user: process.env.DB_USER,       // database username
  password: process.env.DB_PASSWORD, // database password
  database: process.env.DB_NAME    // database name
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected!");
});

// ===== Routes =====

// Save contact form data
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error!" });
    }
    res.json({ success: true, message: "Contact saved successfully!" });
  });
});

// Get all contacts (admin use)
app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Database error!" });
    }
    res.json(results);
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
