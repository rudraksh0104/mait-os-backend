const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true
    },

    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

ChatMessageSchema.statics.getHistory = async function (userId, limit = 10) {
  return await this.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .then((messages) => messages.reverse());
};

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);