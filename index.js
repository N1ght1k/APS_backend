import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 5000;

// const cors = require("cors");
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const sqlite3 = require("sqlite3");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

let db = new sqlite3.Database(
  "../../IdeaProjects/APS_proj/test.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the chinook database.");
  }
);

let data = [];

app.get("/", (req, res) => {
  // res.status(200).json("Сервер работает");
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/api", (req, res) => {
  // res.status(200).json("Сервер работает");
  const sql =
    "SELECT a.Name, a.Auto, a.Number, a.EPC, b.Rssi FROM Main a, Current b WHERE b.EPC=a.EPC ORDER BY b.rssi DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    // rows.forEach((row) => {
    //   console.log(row.name);
    // });
    res.json(rows);
  });
  // res.sendFile(path.join(__dirname + "/index.html"));
});

async function startApp() {
  try {
    app.listen(PORT, () => console.log("listening on port " + PORT));
  } catch (error) {
    console.log(error);
  }
}

startApp();
