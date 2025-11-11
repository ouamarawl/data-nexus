# Data Nexus

A full-stack e-commerce platform built with modern web technologies, featuring a RESTful backend API and a responsive React frontend.

## Project Overview

Data Nexus is a comprehensive e-commerce solution that manages products, categories, orders, user authentication, and admin operations. The platform is designed with a separation of concerns, featuring a robust Node.js/Express backend and a dynamic React-based frontend.

## Repository Structure

```
data-nexus/
├── data-nexus-backend/          # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/         # Request handlers for business logic
│   │   ├── models/              # Data models and schemas
│   │   ├── routes/              # API route definitions
│   │   ├── middleware/          # Express middleware
│   │   ├── utils/               # Helper functions and utilities
│   │   ├── config/              # Configuration files
│   │   ├── Assets/              # Static files and images
│   │   └── server.js            # Entry point
│   ├── package.json
│   └── README.md
├── frontend/                    # React application
│   ├── public/
│   ├── src/
│   │   ├── pages/               # Page components
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/Admin_dashboard/  # Admin management interface
│   │   └── App.js
│   ├── package.json
│   └── README.md
├── node_modules/                # Shared dependencies (if any)
└── package.json                 # Root package configuration
```

## Tech Stack

### Frontend (70.4%)
- **Framework**: React.js
- **Language**: JavaScript
- **Styling**: CSS (29.2%)
- **Build Tool**: Create React App

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing
- **Database**: SQL-based (configuration in db.js)

### Additional Technologies
- **File Upload**: Multer middleware
- **Environment Variables**: dotenv

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- SQL database configured

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/ouamarawl/data-nexus.git
cd data-nexus
```

#### 2. Install Backend Dependencies
```bash
cd data-nexus-backend
npm install
```

#### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Configuration

#### Backend Setup
1. Create a `.env` file in `data-nexus-backend/` directory
2. Configure your database connection and other environment variables
3. Review `src/config/db.js` for database configuration

#### Frontend Setup
1. The frontend is configured to communicate with the backend API
2. Update API endpoints in your components if needed

## Running the Application

### Start Backend Server
```bash
cd data-nexus-backend
npm start
```
The server will run on http://localhost:5050

### Start Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will open at http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Admin Operations
- `GET /api/admin_membre` - Retrieve all admins
- `POST /api/admin_membre` - Add a new admin
- `PUT /api/admin_membre/:id` - Update an admin
- `DELETE /api/admin_membre/:id` - Delete an admin

### Categories
- `GET /api/Categories` - Retrieve all categories
- `POST /api/Categories` - Add a new category
- `PUT /api/Categories/:id` - Update a category
- `DELETE /api/Categories/:id` - Delete a category

### Products
- `GET /api/produits` - Retrieve all products
- `POST /api/produits` - Add a new product
- `PUT /api/produits/:id` - Update a product
- `DELETE /api/produits/:id` - Delete a product

### Orders
- `POST /api/commandes` - Create a new order
- `GET /api/commandes` - Retrieve all orders

## Features

✅ User Registration and Authentication
✅ Product Management (CRUD operations)
✅ Category Management
✅ Order Processing
✅ Admin Dashboard
✅ Admin Member Management
✅ Secure Password Hashing with bcrypt
✅ File Upload Capabilities
✅ RESTful API Architecture
✅ Responsive React UI

## Project Structure Details

### Backend Key Files
- **server.js** - Main application entry point
- **src/middleware/dbConnection.js** - Database connection setup
- **src/middleware/upload.js** - File upload configuration
- **src/utils/helpers.js** - Utility helper functions

### Frontend Key Directories
- **src/pages/Admin_dashboard/** - Admin interface components
- **src/components/** - Reusable React components

## Development

### Backend Scripts
```bash
npm start     # Start the server
npm install   # Install dependencies
```

### Frontend Scripts
```bash
npm start     # Start development server
npm test      # Run tests
npm run build # Create production build
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Environment variables for sensitive configuration
- File upload validation via Multer middleware

## Deployments

The project includes 11 deployment configurations for production and development environments.

## Database

The application uses SQL database. Database utilities include:
- `check-missing-images.js` - Verify image consistency
- `create-missing-images.js` - Generate missing image files
- `fix-images-paths.sql` - Fix image path references in database

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## Project Status

- **Language Distribution**: JavaScript (70.4%), CSS (29.2%), HTML (0.4%)
- **Last Updated**: 5 months ago
- **Repository**: [ouamarawl/data-nexus](https://github.com/ouamarawl/data-nexus)

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For questions, issues, or suggestions, please open an issue on the GitHub repository.

---

**Built by the Data Nexus Team**
