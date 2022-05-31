const mongoose = require("mongoose");
const project_schema = mongoose.Schema;
const new_project = new project_schema({
  key: { type: Number, required: true },
  title: { type: String, required: true },
  University: { type: String, required: true },
  bk_img: { type: String, required: true },
  Availabilty: { type: String, required: true },
  Level: { type: String, required: true },
  Programe: { type: Array, required: true },
  subject: { type: Array, required: true },
  Language: { type: Array, required: true },
});
const proj_model = mongoose.model("assignment4", new_project);
module.exports.proj_model = proj_model;
