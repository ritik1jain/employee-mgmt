const express = require("express");
const router = express.Router();

const { Employee } = require("../models/employee");
const auth = require("../middleware/auth");

// Get all Employees
router.get("/all", async (req, res) => {
  try {
    const data = await Employee.find();
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Unable to fetch Employees" });
  }
});

// Get all Employees for mobile while be removed
router.get("/app/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Employee.find({ _id: id });
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// For getting an Employee by _id
router.get("/getEmployeeById/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Employee.find({ _id: id }).select("-__v -date");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

router.post("/sortEmployeesBy", auth, async (req, res) => {
  const filterUsing = JSON.parse(req.query.sortBy);

  if (!filterUsing)
    return res.status(400).send({ err: "Select fields to sort by!" });

  try {
    const filteredData = await Employee.find(filterUsing);
    res.send(filteredData);
  } catch (error) {
    res.status(400).send({ err: "Internal Error!" });
  }
});

module.exports = router;
