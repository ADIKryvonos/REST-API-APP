const gridMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_KEY } = process.env;

gridMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "m0932383280@gmail.com" };
  await gridMail.send(email);
  return true;
};

module.exports = sendEmail;
