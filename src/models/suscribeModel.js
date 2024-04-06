const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

// Define the schema for the Suscribe model
const suscribeSchema = new mongoose.Schema(
  {
    userId: { type: objectId, trim: true, ref: "User" },
    email: { type: String, trim: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a Suscribe model based on the schema
const Suscribe = mongoose.model("Suscribe", suscribeSchema);

module.exports = Suscribe;
