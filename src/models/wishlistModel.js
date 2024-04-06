const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

// Define the schema for the Wishlist model
const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: objectId, ref: "User", trim: true },
    productId: { type: objectId, ref: "Product", trim: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a Wishlist model based on the schema
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
