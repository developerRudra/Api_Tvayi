const mongoose = require("mongoose");

// Define the schema for the FAQ model
const faqSchema = new mongoose.Schema(
  {
    question: { type, String, trim: true },
    answer: { type, String, trim: true },
    disable: { type: Boolean, trim: true, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a FAQ model based on the schema
const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
