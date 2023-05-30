const express = require("express");
const { contactValidation } = require("../../middlewares");
const controller = require("../../controllers/auth");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  contactValidation(schemas.registrSchema),
  controller.registerUser
);

module.exports = router;
