const express = require("express");
const router = express.Router();

// Local imports
const database = require("../services/dbConnectionAuth/dbConnection");

router.post("/", async (req, res) => {
  // Connection to tenants db
  const db = req.body.db;
  database.connect(db);
  res.status(200).send("connected");
});

module.exports = router;
