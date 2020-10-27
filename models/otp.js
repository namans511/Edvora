const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const OtpSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, expires: "5m", default: Date.now },
});

module.exports = mongoose.model("Otp", OtpSchema);
