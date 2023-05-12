const express = require("express");

const { Schema } = require("../../schema/contacts");
const { contactValidation } = require("../../middlewares");

const router = express.Router();

const func = require("../../controllers/contacts");

router.get("/", func.getAllContacts);

router.get("/:id", func.getContactById);

router.post("/", contactValidation(Schema), func.addNewContact);

router.delete("/:id", func.deleteContact);

router.put("/:id", contactValidation(Schema), func.changeContact);

module.exports = router;
