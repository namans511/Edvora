const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FeedSchema = new Schema(
  {
    question: { type: String, required: true },
    subject: String,
    topic: String,
    postedBy: {
      userType: String,
      id: {
        type: Schema.Types.ObjectId,
        refPath: "postedBy.userType",
      },
    },
    answers: [
      {
        userType: String,
        user: {
          type: Schema.Types.ObjectId,
          refPath: "answers.userType",
        },
        answer: String,
        answeredAt: String,
      },
    ],
    likes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          refPath: "likes.userType",
        },
        userType: String,
      },
    ],
    bookmarks: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          refPath: "likes.userType",
        },
        userType: String,
      },
    ],
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", FeedSchema);
