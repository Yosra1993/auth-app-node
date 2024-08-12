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
|   ├── logger/                   # Logger configuration
|   |   └── index.ts 
│   ├── middlewares/              # Middleware for request handling   
│   │   └── authMiddleware.ts     # Middleware for JWT validation   
│   │
│   ├── models/                   # Data models   
│   │   └── userModel.ts          # User model  
|   |   └── database.ts           # SQLite database connection 
│   │
│   ├── routes/                   # Route definitions  
│   │   ├── authRoutes.ts         # Authentication routes  
│   │   ├── privateRoutes.ts      # Private (protected) routes
│   │   └── publicRoutes.ts       # Public (unprotected) routes
│   │
│   ├── services/                 # Services for business logic
│   │   └── authService.ts        # Authentication service
│   │
│   ├── types/                    # Type definitions and interfaces 
│   │   └── userTypes.ts          # TypeScript types and interfaces for users 
|   |
|   ├── validation/               # Validation schemas and logic  
│   │   └── validationSchemas.ts  # Joi schemas for request validation
|   |                             
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


## Configuration
Create a .env file in the root of the project with the following content:

.env

Copy code

```

# Secret clé pour JWT (à utiliser pour signer les tokens)
JWT_SECRET=your_jwt_secret_key

# URL de connexion à la base de données SQLite
DATABASE_URL=./database.db

# Autres configurations selon vos besoins
PORT=3001

```

Replace your_jwt_secret_key with a secure key for signing JWT tokens.

Ensure that the path to the database in DATABASE_URL is correct and accessible.

Modify the port if necessary, depending on your requirements or port conflicts.


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

The application includes unit tests for the authentication routes, implemented using Mocha and Chai. The tests are defined in the auth.test.ts file located in the test directory.






