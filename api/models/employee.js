const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const uniqueValidator = require("mongoose-unique-validator");
const contextService = require("request-context");
const { Activity } = require("./activity");

const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  name: { type: String, default:null, required: true },
  company_name: { type: String, default: null, required: true },
  designation: { type: String, default: null, required: true },
  address: { type: String, default: null, required: true },
  project: { type: String, default: null, required: true },
  department: { type: String, default: "other", required: true },
  personal_email: { type: String, default: null, required: true },
  company_assigned_email: {
    type: String,
    default: null,
    required: true
  },
  dob: { type: String, default: null, required: true },
  pan_no: { type: String, default: null, required: true },
  employeeCreatedBy: { type: String, default: null },
  
});

employeeSchema.index({
  employee_id: "text",
  designation: "text",
});

employeeSchema.plugin(uniqueValidator);

function validateEmployeeData(employeeData) {
  const schema = Joi.array().items(
    Joi.object({
      employee_id: Joi.number().required(),
      name: Joi.string().required(),
      company_name: Joi.string().required(),
      designation: Joi.string().required(),
      address: Joi.string().required(),
      project: Joi.string().required(),
      company_assigned_email: Joi.string().required(),
      department: Joi.string().required(),
      personal_email: Joi.string().required(),
      dob: Joi.string().required(),
      pan_no: Joi.string().required(),
      employeeCreatedBy: Joi.string(),
      
    })
  );
  return schema.validate(employeeData, { abortEarly: false });
}

function singleEmployee(single) {
  const schema = Joi.object().keys({
    employee_id: Joi.number().required(),
    name: Joi.string().required(),
    company_name: Joi.string().required(),
    designation: Joi.string().required(),
    address: Joi.string().required(),
    project: Joi.string().required(),
    company_assigned_email: Joi.string().required(),
    department: Joi.string().required(),
    personal_email: Joi.string().required(),
    dob: Joi.string().required(),
    pan_no: Joi.string().required(),
    employeeCreatedBy: Joi.string(),
      
  });

  return schema.validate(single);
}

employeeSchema.post("insertMany", async function (doc) {
  const user = contextService.get("request:user");
  let userActivity = {
    action: {
      actionType: "Upload",
      count: doc.length * 1,
    },
    createdBy: { name: user.name, role: user.role },
  };
  try {
    const data = new Activity(userActivity);
    await data.save();
  } catch (error) {
    console.log(error);
  }
});

employeeSchema.post("findOneAndUpdate", async function (doc) {
  const user = contextService.get("request:user");
  let userActivity = {
    action: {
      actionType: "Update",
      count: 1,
    },
    editedBy: { name: user.name, role: user.role },
    id: doc._id,
  };
  try {
    const data = new Activity(userActivity);
    await data.save();
  } catch (error) {
    console.log(error);
  }
});

employeeSchema.post("deleteOne", async function (doc) {
  const user = contextService.get("request:user");
  let userActivity = {
    action: {
      actionType: "Delete",
      count: 1,
    },
    editedBy: { name: user.name, role: user.role },
    id: doc._id,
  };
  try {
    const data = new Activity(userActivity);
    await data.save();
  } catch (error) {
    console.log(error);
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

exports.validateEmployeeData = validateEmployeeData;
exports.singleEmployee = singleEmployee;
exports.Employee = Employee;
