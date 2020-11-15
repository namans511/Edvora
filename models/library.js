const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const LibrarySchema = new Schema(
  {
    title: String,
    year: Number,
    subject: String,
    type: String,
    url: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Library", LibrarySchema);
