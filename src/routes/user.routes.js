const express = require("express");
const userController = require("../controllers/user.controller");
const {
  tenantMiddleware,
  authMiddleware,
  createUsermiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();

const ctrl = new userController();

router.get("/me", authMiddleware, ctrl.me);
router.post("/register", createUsermiddleware, ctrl.create);
router.post("/login", ctrl.login);
router.get("/logout", authMiddleware, ctrl.logout);
router.patch("/update", authMiddleware, ctrl.update);

module.exports = router;
