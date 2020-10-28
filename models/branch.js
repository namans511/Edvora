const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for colleges
const BranchSchema = new Schema({
  name: String,
  code: Number,
});

module.exports = mongoose.model("Branch", BranchSchema);
