# Data Nexus Backend

## Overview
The Data Nexus Backend is a RESTful API built with Node.js and Express, designed to manage various aspects of an e-commerce platform, including products, categories, orders, and admin management.

## Project Structure
```
data-nexus-backend
├── src
│   ├── controllers          # Contains the logic for handling requests
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── models               # Defines the data models and schemas
│   │   ├── admin.js
│   │   ├── category.js
│   │   ├── order.js
│   │   └── product.js
│   ├── routes               # Sets up the API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── middleware           # Middleware functions for the application
│   │   ├── dbConnection.js
│   │   └── upload.js
│   ├── utils                # Utility functions
│   │   └── helpers.js
│   ├── config               # Configuration files
│   │   └── db.js
│   ├── Assets               # Static assets (images, files)
│   └── server.js           # Entry point of the application
├── package.json             # NPM configuration file
└── README.md                # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd data-nexus-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the server:
   ```
   npm start
   ```
2. The server will run on `http://localhost:5050`.

## API Endpoints
- **Admin Operations**
  - `GET /api/admin_membre` - Retrieve all admins
  - `POST /api/admin_membre` - Add a new admin
  - `PUT /api/admin_membre/:id` - Update an admin
  - `DELETE /api/admin_membre/:id` - Delete an admin

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login a user

- **Category Operations**
  - `GET /api/Categories` - Retrieve all categories
  - `POST /api/Categories` - Add a new category
  - `PUT /api/Categories/:id` - Update a category
  - `DELETE /api/Categories/:id` - Delete a category

- **Order Operations**
  - `POST /api/commandes` - Create a new order
  - `GET /api/commandes` - Retrieve all orders

- **Product Operations**
  - `GET /api/produits` - Retrieve all products
  - `POST /api/produits` - Add a new product
  - `PUT /api/produits/:id` - Update a product
  - `DELETE /api/produits/:id` - Delete a product

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.