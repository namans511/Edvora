const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
    require: true,
  },
  userKey: {
    type: String,
    required: true,
  },
  college: String,
  year: Number,
  branch: String,
});

module.exports = mongoose.model("Teacher", teacherSchema);
