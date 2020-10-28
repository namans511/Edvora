const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for colleges
const CollegeSchema = new Schema({
  name: String,
  code: Number,
});

module.exports = mongoose.model("College", CollegeSchema);
