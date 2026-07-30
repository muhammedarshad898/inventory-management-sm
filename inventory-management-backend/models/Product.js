const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    category: { type: String, trim: true },
    quantity: { type: Number, required: [true, "Quantity is required"], default: 0 },
    price: { type: Number, required: [true, "Price is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
