import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerApi, loginApi } from "../services/allApi";

function Authentication() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const result = await loginApi(loginData);

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerData.name || !registerData.email || !registerData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const result = await registerApi(registerData);

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data));

      toast.success("Registration successful");
      navigate("/dashboard");
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={6} lg={5} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Inventory Management</h3>

              <Tabs
                activeKey={activeTab}
                onSelect={(key) => setActiveTab(key)}
                className="mb-4 justify-content-center"
                fill
              >
                <Tab eventKey="login" title="Login">
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                    </Form.Group>

                    <Button type="submit" className="w-100" disabled={loading}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="register" title="Register">
                  <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                      />
                    </Form.Group>

                    <Button type="submit" className="w-100" disabled={loading}>
                      {loading ? "Registering..." : "Register"}
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Authentication;