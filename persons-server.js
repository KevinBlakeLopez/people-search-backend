const express = require("express");
const { Pool } = require("pg");

const cors = require("cors");

const app = express();
app.use(cors());

const pool = new Pool({
  connectionString: process.env.CONNECTSTRING,
});

app.get("/", (req, res) => {
  res.send("hi hi hi");
});

app.get("/people", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people;");
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
