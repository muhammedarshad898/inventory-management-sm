import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, InputGroup, Navbar } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getProductsApi, deleteProductApi, logoutApi } from "../services/allApi";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";

function ProductsList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Redirect to auth if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    } else {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await getProductsApi();
      setProducts(result.data);
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to fetch products";
      toast.error(message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProductApi(id);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete product";
      toast.error(message);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      // even if the API call fails, clear the client-side session
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out");
      navigate("/auth");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar bg="primary" variant="dark" className="px-4 mb-4">
        <Navbar.Brand>Inventory Dashboard</Navbar.Brand>
        <Button variant="outline-light" className="ms-auto" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar>

      <Container>
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <InputGroup style={{ maxWidth: "300px" }}>
            <Form.Control
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <Button variant="success" onClick={() => setShowAddModal(true)}>
            + Add Product
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className={product.quantity < 10 ? "table-danger" : ""}
                >
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      <AddModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        refreshProducts={fetchProducts}
      />

      {selectedProduct && (
       <EditModal
  show={showEditModal}
  handleClose={() => {
    setShowEditModal(false);
    setSelectedProduct(null);
  }}
  refreshProducts={fetchProducts}
  product={selectedProduct}
/>
      )}
    </>
  );
}

export default ProductsList;