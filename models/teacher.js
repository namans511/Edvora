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
  isProfileComplete: {
    type: String,
    require: true,
  },
  userKey: {
    type: String,
    required: true,
  },
  subjects: [String],
  college: String,
  year: Number,
  branch: String,
  imageUrl: String,
});

module.exports = mongoose.model("Teacher", teacherSchema);
