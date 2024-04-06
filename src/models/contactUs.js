const mongoose = require("mongoose");

// Define the schema for the Contact model
const contactSchema = new mongoose.Schema(
  {
    name: { type, String, trim: true },
    email: { type, String, trim: true },
    phoneNumber: { type, Number, trim: true },
    message: { type, String, trim: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a Contact model based on the schema
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
