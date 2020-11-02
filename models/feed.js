const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const FeedSchema = new Schema(
  {
    question: { type: String, required: true },
    subject: String,
    topic: String,
    postedBy: { id: Schema.Types.ObjectId, userType: String },
    answers: [{ id: Schema.Types.ObjectId, userType: String }],
    likes: [{ id: Schema.Types.ObjectId, userType: String }],
    bookmarks: [{ id: Schema.Types.ObjectId, userType: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", FeedSchema);
