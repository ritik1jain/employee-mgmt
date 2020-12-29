const express = require("express");
const router = express.Router();

const { Tenant } = require("../models/tenant");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  const TenantId = req.body.id;
  try {
    await Tenant.deleteOne({ _id: TenantId });
    res.send({ res: "Tenant deleted" });
  } catch (error) {
    res.status(500).send({ err: "Tenant deletion failed" });
  }
});

module.exports = router;
