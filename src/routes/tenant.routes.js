const express = require("express");
const tenantController = require("../controllers/tenant.controller");

let router = express();
const ctrl = new tenantController();

router.post("/registertenant", ctrl.create);
router.get("/getTenant/:tenantId", ctrl.findById);
router.patch("/updatetenant/:tenantId", ctrl.updateById);
router.get("/activate/:tenantId", ctrl.activate);
router.get("/diactivate/:tenantId", ctrl.diactivate);


module.exports = router;
