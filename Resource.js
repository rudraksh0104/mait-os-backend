const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  title: String,
  category: String,
  icon: String,
  color: String,
  downloads: { type: Number, default: 0 },
  fileSize: String,
  fileUrl: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Resource", ResourceSchema);