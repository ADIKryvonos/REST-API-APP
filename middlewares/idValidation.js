const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const idValidation = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} - not valid id`));
  }
  next();
};

module.exports = idValidation;
