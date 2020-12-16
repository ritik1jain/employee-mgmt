const express = require("express");
const router = express.Router();

// Local imports
const auth = require("../middleware/auth");
const { Employee, validateEmployeeData, singleEmployee } = require("../models/employee");

router.post("/createNew", auth, async (req, res) => {
  let data = req.body;
  data.employeeCreatedBy = req.user.name;

  const { error } = singleEmployee(data);
  // console.log(error.details);
  if (error) {
    return res.status(500).send({
      err: `Field: ${error.details[0].path}. Msg: ${error.details[0].message}`,
    });
  }

  try {
    await Employee.create(data);
    res.send({ msg: "Employee added" });
  } catch (error) {
    res.status(500).send({
      err: "Failed to a add Employee",
    });
  }
  // cponsole.log("h");
});

// Routes to save Employees list recieved from the client
router.post("/", auth, async (req, res) => {
  // Function call to filter and clean the data
  let array = req.body;

  array.forEach((element) => {
    element.employeeCreatedBy = req.user.name;
    // element.deleteStatus = false;
    // element.visibility = true;
  });

  const { error } = validateEmployeeData(array);
  if (error) {
    return res.status(400).json({
      msg: "Error in file. View logs below",
      err: error.details,
    });
  }

  try {
    await Employee.insertMany(array);
    res.send({ res: "Employee list added" });
  } catch (error) {
    res.status(500).send({ msg: error.message, err: "Failed to save file!" });
  }
});

router.put("/edit/:id", auth, async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  try {
    const newEmployeeData = await Employee.findOneAndUpdate(
      { _id: id },
      { 
        $set: newData,
      },
      { new: true }
    );
    res.send({ msg: "Employee Updated" });
  } catch (error) {
    res.status(500).send({ err: "Employee update failed" });
  }
});

module.exports = router;

// return res.status(500).send({
//   err: `Row: ${error.details[0].path[0] + 1} Column: ${
//     error.details[0].path[1]
//   }. Error: ${error.details[0].context.label}`,
// });
