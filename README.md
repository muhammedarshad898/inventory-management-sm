# Inventory Management System

A simple **Inventory Management System** built using the **MERN Stack** with **JWT Authentication**. This application allows authenticated users to manage product inventory by adding, viewing, updating, searching, and deleting products.

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Product Routes
* Logout Functionality

### Product Management

* Add Product
* View All Products
* Edit Product
* Delete Product
* Search Products by Name
* Low Stock Highlight (Quantity less than 10)
* Form Validation

  * Required fields validation
  * Negative price and quantity validation

---

## Tech Stack

### Frontend

* React (Vite)
* React Bootstrap
* React Router DOM
* Axios
* React Toastify
* Bootstrap

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs

---

## Project Structure

### Backend

```
backend/
│── controllers/
│── middleware/
│── models/
│── routes/
│── utils/
│── server.js
```

### Frontend

```
frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
```

---

## Installation

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

---

## Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server.

```bash
npm start
```

or

```bash
npm run dev
```

---

## Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

The backend API runs at:

```
http://localhost:5000
```

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| POST   | `/api/auth/logout`   | Logout user         |

### Products

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/products`     | Get all products |
| POST   | `/api/products`     | Add a product    |
| PUT    | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

> All product routes require a valid JWT Bearer Token.

---

## Validation

### Backend

* Name is required.
* Quantity is required.
* Price is required.
* Price cannot be negative.
* Quantity cannot be negative.

### Frontend

* Required field validation.
* Negative value validation.
* User-friendly toast notifications.

---

## Authentication Flow

1. User registers or logs in.
2. Server generates a JWT token.
3. Token is stored in Local Storage.
4. Axios automatically sends the token in the Authorization header for protected API requests.
5. Protected routes can only be accessed by authenticated users.
6. Logout removes the stored token and redirects the user to the login page.

---

## Future Improvements

* Pagination
* Product Categories Filter
* Image Upload
* Stock Analytics Dashboard
* Token Expiration Handling
* Unit & Integration Tests

---

## Author

**Muhammed Arshad**

Full Stack Developer (MERN Stack)
