const express = require("express");
const OrderController = require("../controllers/order.controller.js");
const {
  authMiddleware,
  tenantMiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();
const ctrl = new OrderController();

router.post("/create", authMiddleware, tenantMiddleware, ctrl.create);
router.get("/all", authMiddleware, tenantMiddleware, ctrl.getAll);
router.get("/:id", authMiddleware, tenantMiddleware, ctrl.getOne);
router.patch("/update/:id", authMiddleware, tenantMiddleware, ctrl.update);
router.delete("/delete/:id", authMiddleware, tenantMiddleware, ctrl.delete);

module.exports = router;
