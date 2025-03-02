const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const CustomerSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
});

module.exports = mongoose.model("Customer", CustomerSchema);
