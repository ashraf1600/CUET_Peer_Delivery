const mongoose = require("mongoose");

const StatusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["Open", "Requested", "Accepted", "Completed"],
    required: true,
  },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  changedAt: { type: Date, default: Date.now },
});

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  name: { type: String },
  role: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Open", "Requested", "Accepted", "Completed"],
    default: "Open",
  },
  statusHistory: [StatusHistorySchema],
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
