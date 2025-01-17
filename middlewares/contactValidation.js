const { HttpError } = require("../helpers");

const contactValidation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!req._body) {
      console.log(req);
      throw HttpError(400, `Missing fields`);
    } else if (error) {
      console.log(error);
      next(HttpError(400, `Missing required ${error.details[0].path} field`));
    }
    next();
  };

  return func;
};

module.exports = contactValidation;
