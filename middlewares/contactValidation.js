const { HttpError } = require("../helpers");

const contactValidation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!req._body) {
      throw HttpError(400, "Missing fields");
    } else if (error) {
      next(HttpError(400, `Missing required ${error} field`));
    }
    next();
  };

  return func;
};

module.exports = contactValidation;
