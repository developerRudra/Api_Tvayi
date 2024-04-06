const mongoose = require("mongoose");
const { role } = require("../helper/userRole");
const { permissions } = require("../helper/permission");
// const f = require("../image")

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      trim: true,
      default:
        "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100",
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    isVerification: {
      type: Boolean,
      default: false,
      trim: true,
    },
    role: {
      type: [{ type: String, enum: Object.values(role) }],
      default: [role.user],
      trim: true,
    },
    permissions:{
      type: [{ type: String, enum: Object.values(permissions) }],
      default: [permissions.none],
      trim: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create a User model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
