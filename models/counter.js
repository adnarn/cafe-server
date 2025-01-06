const mongoose = require("mongoose");

// Schema for the Counter
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Unique ID for the counter
  seq: { type: Number, default: 1 },    // Sequence number
});

// Create the Counter model
const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
