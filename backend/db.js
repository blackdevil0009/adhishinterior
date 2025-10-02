import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2007",
  database: "contactdb"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected!");
});

export default db;
