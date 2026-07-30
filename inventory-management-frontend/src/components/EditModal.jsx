import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateProductApi } from "../services/allApi";

function EditModal({ show, handleClose, refreshProducts, product }) {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  // Fill form when a product is selected
  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || "",
        category: product.category || "",
        quantity: product.quantity || "",
        price: product.price || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category, quantity, price } = productData;

    if (!name || quantity === "" || price === "") {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(quantity) < 0 || Number(price) < 0) {
      toast.error("Price and quantity cannot be negative");
      return;
    }

    try {
      setLoading(true);

      await updateProductApi(product._id, {
        name,
        category,
        quantity: Number(quantity),
        price: Number(price),
      });

      toast.success("Product updated successfully");

      refreshProducts();
      handleClose();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update product";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Product name"
              value={productData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Category"
              value={productData.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={productData.quantity}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditModal;