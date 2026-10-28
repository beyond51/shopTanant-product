const express = require("express");
const OrderController = require("../controllers/order.controller.js");

const router = express.Router();
const ctrl = new OrderController();

// router.post("/create", ctrl.create);
router.get("/all", ctrl.getAll);
router.get("/singleorder/:id", ctrl.getOne);
router.patch("/update/:id", ctrl.update);
router.delete("/delete/:id", ctrl.delete);
router.get("/getPending", ctrl.findOrders);
router.patch("/updateStatus/:orderNumber", ctrl.updateStatus);

module.exports = router;
