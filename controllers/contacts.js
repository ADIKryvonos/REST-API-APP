const { HttpError, tryCatchDecorator } = require("../helpers");

const Contact = require("../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;

  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deleted = await Contact.findByIdAndRemove(id);
  if (!deleted) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const changeContact = async (req, res) => {
  const { id } = req.params;
  const update = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.json(update);
};

const changeFavorite = async (req, res) => {
  const { id } = req.params;
  const update = await Contact.findByIdAndUpdate(id, req.body, { new: true });
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
  changeFavorite: tryCatchDecorator(changeFavorite),
};
