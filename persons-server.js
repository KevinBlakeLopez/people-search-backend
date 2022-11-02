const express = require("express");
//postgres middleware
const { Pool } = require("pg");

//cross origin resource sharing  middleware
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.CONNECTSTRING,
  // connectionString: "postgres://adzoofqf:nFuySRlJ_5vYwB0ChLkyEZd1LDXkLssv@heffalump.db.elephantsql.com/adzoofqf"
});

app.get("/", (req, res) => {
  res.send("Greetings.  This is people search.");
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

app.post("/person", async (req, res) => {
  console.log("working!");
  try {
    const result = await pool.query(
      `INSERT INTO people (first_name) VALUES ('${req.body.first_name}') RETURNING *;`
    );
    res.send(result.rows);
  } catch (err) {
    res.send(err);
  }
});

app.put("/person", async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE people
      SET first_name = '${req.body.first_name}'
      WHERE id = ${req.body.id}
      RETURNING *;`
    );
    res.send(result.rows);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/people", async (req, res) => {
  try {
    const result = await pool.query(
        `TRUNCATE people`
     );
    res.send(result.rows);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/person", async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE from people
       WHERE id = '${req.body.id}'
       RETURNING *;`
    );
    res.send(result.rows);
  } catch (err) {
    res.send(err);
  }
})

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
