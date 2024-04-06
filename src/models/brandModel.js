const mongoose = require("mongoose");

// Define the schema for the Brand model
const brandSchema = new mongoose.Schema(
  {
    image: { type: String, trim: true, default: "" },
    name: { type: String, trim: true, default: "TVAYI" },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a  Brand model based on the schema
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
