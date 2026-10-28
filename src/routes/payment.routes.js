const express = require("express");
const PaymentController = require("../controllers/payment.controller");

const router = express.Router();

const ctrl = new PaymentController();

router.post("/create-order", ctrl.createPaymentOrder);
router.post("/verify", ctrl.verifypayment);

module.exports = router;
