const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for colleges
const SubjectSchema = new Schema({
  name: String,
  code: Number,
});

module.exports = mongoose.model("Subject", SubjectSchema);
