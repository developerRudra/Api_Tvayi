const mongoose = require("mongoose");

// Define the schema for the HomeBannerAndVideo model
const homeBannerAndVideoSchema = new mongoose.Schema(
  {
    banner: { type: String, trim: true },
    type: { type: String, trim: true, enum: ["VIDEO", "IMAGE"] },
    disable: { type: Boolean, trim: true, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a HomeBannerAndVideo model based on the schema
const HomeBannerAndVideo = mongoose.model(
  "HomeBannerAndVideo",
  homeBannerAndVideoSchema
);

module.exports = HomeBannerAndVideo;
