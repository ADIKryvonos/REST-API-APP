const { HttpError, tryCatchDecorator } = require("../helpers");

const Contact = require("../models/contact");
const contacts = require("../models/contacts");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const addNewContact = async (req, res) => {
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deleted = await contacts.removeContact(id);
  if (!deleted) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const changeContact = async (req, res) => {
  const { id } = req.params;
  const update = await contacts.updateContact(id, req.body);
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.json(update);
};

module.exports = {
  getAllContacts: tryCatchDecorator(getAllContacts),
  getContactById: tryCatchDecorator(getContactById),
  addNewContact: tryCatchDecorator(addNewContact),
  deleteContact: tryCatchDecorator(deleteContact),
  changeContact: tryCatchDecorator(changeContact),
};
