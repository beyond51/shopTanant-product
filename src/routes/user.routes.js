const express = require("express");
const userController = require("../controllers/user.controller");
const {
  tenantMiddleware,
  authMiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();

const ctrl = new userController();

router.post("/register", tenantMiddleware, ctrl.create);
router.post("/login", ctrl.login);
router.patch("/update", authMiddleware, ctrl.update);

module.exports = router;
