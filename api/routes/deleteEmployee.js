const express = require("express");
const router = express.Router();

const { Employee } = require("../models/employee");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const EmployeeId = req.body.id;
  try {
    await Employee.deleteOne({ _id: EmployeeId });
    res.send({ res: "Employee deleted" });
  } catch (error) {
    res.status(500).send({ err: "Employee deletion failed" });
  }
});

module.exports = router;
