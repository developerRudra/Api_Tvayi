const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

// Define the schema for the Address model
const addressSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    mobile: { type: Number, trim: true },
    houseNumber: { type: String, trim: true },
    userId: {
      type: objectId,
      ref: "User",
      trim: true,
    },
    pincode:  { type: Number, trim: true },
    city:  { type: String, trim: true },
    state:  { type: String, trim: true },
    landmark:  { type: String, trim: true },
    country: { type: String, default: "INDIA" },
    area:  { type: String, trim: true },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a  Address model based on the schema
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
