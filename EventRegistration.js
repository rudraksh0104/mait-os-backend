const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema(
{
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  eventTitle: {
    type: String,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    default: ""
  },

  phone: {
    type: String,
    default: ""
  },

  branch: {
    type: String,
    default: "CSE"
  },

  semester: {
    type: String,
    default: "5"
  },

  status: {
    type: String,
    default: "Registered"
  },

  registeredAt: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "EventRegistration",
  EventRegistrationSchema
);