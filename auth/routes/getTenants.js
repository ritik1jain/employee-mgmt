const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { Tenant } = require("../models/tenant");

router.get("/", async (req, res) => {
  const tenants = await Tenant.find({ role: { $eq: "senior" } }).select(
    "-__v -password -userType"
  );
  res.send(tenants);
});

router.post("/", async (req, res) => {
  try {
    const tenants = await Tenant.find({
      orgDatabase: { $eq: req.body.db },
      role: { $eq: "senior" },
    }).select("-__v -password -userType");
    res.send(tenants);
  } catch (error) {
    return res.status(500).send({ res: "Internal server error" });
  }
});

// Get Tenants distinctly by organisation
router.get("/distinctorganisation", async (req, res) => {
  try {
    const data = await Tenant.find({ role: { $eq: "senior" } }).select("-__v").distinct("companyName");

    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});

// For getting all Tenants of a specific organisation
router.get("/Tenantlist/:organisation", auth, async (req, res) => {
  const organisation = req.params.organisation;
  try {
    const data = await Tenant.find({role: { $eq: "senior" }, companyName: {$eq: organisation} }).select("-__v");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});


// For getting an Tenant by _id
router.get("/getTenantById/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Tenant.find({ _id: id }).select("-__v -password");
    res.send(data);
  } catch (error) {
    res.status(500).send({ err: "Request failed" });
  }
});


// router.get("/getAllTenantsByOrg", async (req, res) => {
//   const tenants = await Tenant.find({
//     orgDatabase: { $eq: req.body.db },
//     role: { $eq: "senior" },
//   }).select("-__v -password -userType");
//   //   { role: { $eq: "senior" } }).select(
//   //   "-__v -password -userType"
//   // );
//   res.send(tenants);
// });

module.exports = router;
