const { HttpError } = require("../helpers");

const favoriteValidation = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (!req._body) {
      throw HttpError(400, `Missing field favorite`);
    } else if (error) {
      console.log(error);
      next(HttpError(400, `Missing required ${error.details[0].path} field`));
    }
    next();
  };

  return func;
};

module.exports = favoriteValidation;
