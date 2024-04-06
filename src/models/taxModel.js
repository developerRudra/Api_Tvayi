const mongoose = require("mongoose");

// Define the schema for the Tax model
const taxSchema = new mongoose.Schema(
  {
    taxpercentage: { type: Number, trim: true },
    disable: { type: Boolean, trim: true, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a Tax model based on the schema
const Tax = mongoose.model("Tax", taxSchema);

module.exports = Tax;
