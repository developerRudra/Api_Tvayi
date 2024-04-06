const mongoose = require("mongoose");

// Define the schema for the Product model
const productSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    thumbnail: { type: String, trim: true },
    images: [{ type: String }],
    pCategoryId: { type: objectId, ref: "Category", trim: true },
    categoryId: { type: objectId, ref: "Category", trim: true },
    brandId: { type: objectId, ref: "Brand", default: "", trim: true },
    price: { type: Number, trim: true },
    mrp: { type: Number, trim: true },
    taxId: {
      type: objectId,
      ref: "Tax",
      trim: true,
    },
    disscount: { type: Number, trim: true },
    stock: { type: Number, trim: true },
    size: { type: Number, trim: true },
    sold: { type: Number, default: 0, trim: true },
    productBanner: [{ type: String }],
    description: { type: String, trim: true },
    reviewCount: { type: Number, default: 0, trim: true },
    averageRating: { type: Number, default: 0, trim: true },
    metaDescription: { type: String, trim: true },
    metaImage: { type: String, trim: true },
    metaTitle: { type: String, trim: true },
    metaTags: { type: String, trim: true },
    // returnInDays: { type: Number, trim: true },
    disable: { type: Boolean, default: false, trim: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);


// Create a Product model based on the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
