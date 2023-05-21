const express = require("express");

const { Schema, FavoriteSchema } = require("../../schema/contacts");
const {
  contactValidation,
  idValidation,
  favoriteValidation,
} = require("../../middlewares");

const router = express.Router();

const func = require("../../controllers/contacts");

router.get("/", func.getAllContacts);

router.get("/:id", idValidation, func.getContactById);

router.post("/", contactValidation(Schema), func.addNewContact);

router.delete("/:id", idValidation, func.deleteContact);

router.put("/:id", idValidation, contactValidation(Schema), func.changeContact);

router.patch(
  "/:id/favorite",
  idValidation,
  favoriteValidation(FavoriteSchema),
  func.changeFavorite
);

module.exports = router;
