const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
{
title: String,
type: String,
date: String,
prize: String,
description: String,
tags: [String],
isActive: {
type: Boolean,
default: true
}
},
{
timestamps: true
}
);

module.exports = mongoose.model("Event", EventSchema);
