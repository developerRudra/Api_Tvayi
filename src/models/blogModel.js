const mongoose = require("mongoose");

// Define the schema for the blog model
const blogSchema = new mongoose.Schema(
  {
    image: { type: String, trim: true },
    title: { type: String, trim: true },
    subTitle: { type: String, trim: true },
    disable: { type: Boolean, trim: true, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a  blog model based on the schema
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
