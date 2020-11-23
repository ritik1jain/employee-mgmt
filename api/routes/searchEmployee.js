const express = require("express");
const router = express.Router();

// Local imports
const { Employee } = require("../models/employee");
const auth = require("../middleware/auth");

// Routes to search Employees
router.get("/", auth, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.send({ msg: "Search Employees" });

    const results = await Employee.find({
      $or: [
        {
          $text: {
            $search: query,
          },
        },
        {
          employee_id: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });
    res.send(results);
  } catch (error) {
    res.status(500).send({ err: "Unable to search" });
  }
});

module.exports = router;
