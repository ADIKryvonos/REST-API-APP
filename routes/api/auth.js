const express = require("express");

const {
  contactValidation,
  authentication,
  upload,
} = require("../../middlewares");

const controller = require("../../controllers/auth");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  contactValidation(schemas.registrSchema),
  controller.registerUser
);

router.post(
  "/login",
  contactValidation(schemas.logInSchema),
  controller.loginUser
);

router.get("/current", authentication, controller.getCurrent);

router.post("/logout", authentication, controller.logoutUser);

router.patch(
  "/avatars",
  authentication,
  upload.single("avatar"),
  controller.updateAvatar
);

module.exports = router;
