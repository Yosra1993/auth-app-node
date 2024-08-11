# Auth-App-Node

## Description
This project is a Node.js and Express-based authentication application, implementing JWT (JSON Web Token) to manage user authentication. The application includes both public and private routes, and handles user data securely using TypeScript.

## Project Architecture

The project structure is organized as follows:


```
auth-app-node/
│
├── dist/                         # Compiled files (TypeScript compiled to  JavaScript)     
│
├── node_modules/                 # Project dependencies    
│
├── src/                          # Application source code   
│   ├── config/                   # Application configuration   
│   │   └── index.ts              # Main configuration file   
│   │
│   ├── controllers/              # Controllers to handle requests   
│   │   ├── authController.ts     # Authentication controller   
│   │   ├── privateController.ts  # Controller for private routes   
│   │   └── publicController.ts   # Controller for public routes   
│   │
│   ├── middlewares/              # Middleware for request handling   
│   │   └── authMiddleware.ts     # Middleware for JWT validation   
│   │
│   ├── models/                   # Data models   
│   │   └── userModel.ts          # User model  
│   │
│   ├── routes/                   # Route definitions  
│   │   ├── authRoutes.ts         # Authentication routes  
│   │   ├── privateRoutes.ts      # Private (protected) routes
│   │   └── publicRoutes.ts       # Public (unprotected) routes
│   │
│   ├── services/                 # Services for business logic
│   │   └── authService.ts        # Authentication service
│   │
│   └── index.ts                  # Application entry point
│
├── test/                         # Unit tests for the application
│   └── auth.test.ts              # Unit test for authentication
│
├── database.db                   # Database file (if applicable)
│
├── package.json                  # NPM dependencies and scripts
├── package-lock.json             # Locked versions of dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

## Installation

1. **Clone the repository**:
   bash

   git clone https://github.com/Yosra1993/auth-app-node.git
   
2. **Navigate to the project directory**:
   bash

   cd auth-app-node
   
3. **Install the dependencies**:
   bash

   npm install
   

### Running the Server

To start the server in development mode, use the following command:

bash

npm run dev

To run the server in production mode (after building the TypeScript files), use:

bash

npm start

This will serve the compiled JavaScript files from the `dist` directory.

## API Endpoints

### Authentication Routes

1. **Register a new user**
   - **Endpoint**: `/api/auth/register`
   - **Method**: `POST`
   - **Body**:
     json
     {
       "username": "exampleuser",
       "password": "examplepassword"
     }
     
   - **Response**: A success message if the user is registered successfully.

2. **Login**
   - **Endpoint**: `/api/auth/login`
   - **Method**: `POST`
   - **Body**:
     json

     {
       "username": "exampleuser",
       "password": "examplepassword"
     }
     
   - **Response**: A JWT token if the credentials are correct.

### Private Routes

1. **Access private content**
   - **Endpoint**: `/api/private`
   - **Method**: `GET`
   - **Headers**:
     - `Authorization`: `Bearer <your-jwt-token>`
   - **Response**: A message indicating that this is a private route.

### Public Routes

1. **Access public content**
   - **Endpoint**: `/api/public`
   - **Method**: `GET`
   - **Response**: A message indicating that this is a public route.

## Tests

The application includes unit tests for the authentication routes. You can run the tests using the following command:

To run unit tests:

bash

npm test





