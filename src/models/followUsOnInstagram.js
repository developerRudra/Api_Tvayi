const mongoose = require("mongoose");

// Define the schema for the FollowUsOnInstagra model
const followUsOnInstagramSchema = new mongoose.Schema(
  {
    image: { type: String, trim: true },
    link: { type: String, trim: true },
    disable: { type: Boolean, trim: true, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a FollowUsOnInstagra model based on the schema
const FollowUsOnInstagra = mongoose.model(
  "FollowUsOnInstagra",
  followUsOnInstagramSchema
);

module.exports = FollowUsOnInstagra;
