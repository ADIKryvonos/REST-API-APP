const Joi = require("joi");

const Schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    }),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean(),
});

const FavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Schema,
  FavoriteSchema,
};
