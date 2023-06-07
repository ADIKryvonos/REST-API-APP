const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { SECRET_KEY, BAZE_URL } = process.env;

const { tryCatchDecorator, HttpError, sendEmail } = require("../helpers");

const { User } = require("../models/user");

const avatarsDir = path.join(__dirname, "../", "/public", "avatars");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verefyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BAZE_URL}/users/verify/${verificationToken}">Click</a>`,
  };

  await sendEmail(verefyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerifyUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verefyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BAZE_URL}/users/verify/${user.verificationToken}">Click</a>`,
  };

  await sendEmail(verefyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email is not verify");
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const filename = `${req.user._id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);

  await Jimp.read(`${tempUpload}`)
    .then((image) => {
      image.resize(250, 250).write(`${tempUpload}`);
    })
    .catch((err) => {
      console.log(err);
    });

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  registerUser: tryCatchDecorator(registerUser),
  verifyUser: tryCatchDecorator(verifyUser),
  resendVerifyUser: tryCatchDecorator(resendVerifyUser),
  loginUser: tryCatchDecorator(loginUser),
  getCurrent: tryCatchDecorator(getCurrent),
  logoutUser: tryCatchDecorator(logoutUser),
  updateAvatar: tryCatchDecorator(updateAvatar),
};
