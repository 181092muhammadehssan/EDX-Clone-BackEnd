const { string } = require("joi");
const mongoose = require("mongoose");
const signup_schema = mongoose.Schema;
const new_signup = new signup_schema({
  full_name: { type: String, required: true },
  public_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
});

const signup_model = mongoose.model("signup", new_signup);
module.exports.signup_model = signup_model;
