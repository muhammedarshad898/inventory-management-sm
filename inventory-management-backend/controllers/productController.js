const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, price } = req.body;

    if (!name || quantity === undefined || price === undefined) {
      return res.status(400).json({ message: "Name, quantity and price are required" });
    }
    if (price < 0 || quantity < 0) {
      return res.status(400).json({ message: "Price and quantity cannot be negative" });
    }

    const product = await Product.create({ name, category, quantity, price });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, category, quantity, price } = req.body;

    if (price !== undefined && price < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, quantity, price },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };