import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Save contact form data
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  const sql = "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true, message: "Contact saved successfully!" });
  });
});


// Get all contacts (admin use)
app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
