const express = require("express");
const userTenantController = require("../controllers/userTenant.controller");

const router = express.Router();

const ctrl = new userTenantController();

router.post("/getallTenants", ctrl.findAllTenants);
router.post("/verifytenant", ctrl.tenantselect);

module.exports = router;
