const express = require("express");

const { Schema, FavoriteSchema } = require("../../schema/contacts");
const {
  contactValidation,
  idValidation,
  favoriteValidation,
  authentication,
} = require("../../middlewares");

const router = express.Router();

const func = require("../../controllers/contacts");

router.get("/", authentication, func.getAllContacts);

router.get("/:id", authentication, idValidation, func.getContactById);

router.post("/", authentication, contactValidation(Schema), func.addNewContact);

router.delete("/:id", authentication, idValidation, func.deleteContact);

router.put(
  "/:id",
  authentication,
  idValidation,
  contactValidation(Schema),
  func.changeContact
);

router.patch(
  "/:id/favorite",
  authentication,
  idValidation,
  favoriteValidation(FavoriteSchema),
  func.changeFavorite
);

module.exports = router;
