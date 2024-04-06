const mongoose = require("mongoose");

// Define the schema for the Company model
const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, trim: true },
    companyNumber: { type: String, trim: true },
    companyDiscription: { type: String, trim: true },
    logo: { type: String, trim: true },
    lodar: { type: String, trim: true },
    latitude: { type: String, trim: true },
    longitude: { type: String, trim: true },
    favLogo: { type: String, trim: true },
    foterLogo: { type: String, trim: true },
    aboutUs: { type: String, trim: true },
    privacyPolicy: { type: String, trim: true },
    refundPolicy: { type: String, trim: true },
    shippingPolicy: { type: String, trim: true },
    termsOfService: { type: String, trim: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a Company model based on the schema
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
