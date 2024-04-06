const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

// Define the schema for the Category model
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    pCategory: { type: objectId, trim: true, default: null },
    image: { type: String, trim: true },
    disable: { type: Boolean, trim: true, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a Category model based on the schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
