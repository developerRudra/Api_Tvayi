const mongoose = require("mongoose");

// Define the schema for the Cart model
const cartSchema = new mongoose.Schema(
  {
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a Cart model based on the schema
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
