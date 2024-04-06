const mongoose = require("mongoose");
let objectId = mongoose.Types.ObjectId;

const reviewModel = new mongoose.Schema(
  {
    userId: { type: objectId, ref: "User" },
    productId: { type: objectId, ref: "Product" },
    message: String,
    rating: Number,
    disable: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Review", reviewModel);
