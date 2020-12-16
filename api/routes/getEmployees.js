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

// Get Employees distinctly by department
router.get("/distinctdepartment", async (req, res) => {
  try {
    const data = await Employee.find().select("-__v").distinct("department");

    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// Get subdepartment distinct Employees for a specific department
router.get("/distinctSubdepartment/:department", auth, async (req, res) => {
  const department = req.params.department.replace(/_/g, " ");
  try {
    const data = await Employee.find({ department: department })
      .select("-__v")
      .distinct("sub_department");

    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// For getting all Employees of a specific department
router.get("/Employeelist/:department", auth, async (req, res) => {
  const department = req.params.department;
  try {
    const data = await Employee.find({ department: department }).select("-__v");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// Get subdepartment Employees of a specific department
router.get("/Employeelist/:department/:subdepartment", auth, async (req, res) => {
  const department = req.params.department.replace(/_/g, " ");
  const sub_department = req.params.subdepartment.replace(/_/g, " ");
  try {
    const data = await Employee.find({
      department: department,
      sub_department: sub_department,
    }).select("-__v -date");

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
