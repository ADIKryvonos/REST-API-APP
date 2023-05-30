const mongoose = require("mongoose");
const Joi = require("joi");
const { mongooseError } = require("../helpers");

const Schema = mongoose.Schema;

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      Math: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError);

const registrSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const logInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const schemas = { registrSchema, logInSchema };

const User = mongoose.model("user", userSchema);

module.exports = { schemas, User };
