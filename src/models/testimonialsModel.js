const mongoose = require("mongoose");

// Define the schema for the Testimonial model
const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    reating: { type: Number, trim: true, default: 1 },
    discriptipon: { type: String, trim: true },
    Country: { type: String, trim: true, default: "INDIA" },
    disable: { type: Boolean, trim: true, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a Testimonial model based on the schema
const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
