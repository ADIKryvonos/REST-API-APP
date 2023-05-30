const { tryCatchDecorator, HttpError } = require("../helpers");

const { User } = require("../models/user");

const registerUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create(req.body);
  res.status(201).json({
    email: newUser.email,
    subscription: "starter",
  });
};

module.exports = {
  registerUser: tryCatchDecorator(registerUser),
};
