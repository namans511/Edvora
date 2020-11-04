const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FeedSchema = new Schema(
  {
    question: { type: String, required: true },
    subject: String,
    topic: String,
    postedBy: { id: Schema.Types.ObjectId, userType: String },
    answers: [{ id: Schema.Types.ObjectId, userType: String, answer: String }],
    likes: [{ id: Schema.Types.ObjectId, userType: String }],
    bookmarks: [{ id: Schema.Types.ObjectId, userType: String }],
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", FeedSchema);
