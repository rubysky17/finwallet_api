# FinWallet Backend API

A robust NestJS-based backend API for a financial wallet management application. This application provides comprehensive user authentication, wallet management, and category organization features.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Wallet Management**: Create, manage, and track multiple wallets with different types
- **Category System**: Hierarchical category management for income and expenses
- **Category Templates**: User-specific category templates for personalized organization
- **Comprehensive Logging**: Winston-based logging with structured output
- **Database Integration**: MySQL database with TypeORM for data persistence
- **API Documentation**: Complete API documentation with examples
- **Docker Support**: Containerized development environment

## 🏗️ Architecture

### Technology Stack

- **Framework**: NestJS 11.x
- **Database**: MySQL 8.0
- **ORM**: TypeORM 0.3.x
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator & class-transformer
- **Logging**: Winston with nest-winston
- **Testing**: Jest
- **Containerization**: Docker & Docker Compose

### Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── dto/                # Data transfer objects
│   ├── guards/             # Authentication guards
│   ├── strategies/         # Passport strategies
│   ├── decorators/         # Custom decorators
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Auth business logic
│   └── auth.module.ts      # Auth module configuration
├── users/                  # User management module
│   ├── dto/               # User DTOs
│   ├── user.entity.ts     # User database model
│   ├── users.controller.ts # User endpoints
│   ├── users.service.ts   # User business logic
│   └── users.module.ts    # User module configuration
├── wallets/               # Wallet management module
│   ├── wallet.entity.ts   # Wallet database model
│   ├── wallet.controller.ts # Wallet endpoints
│   └── wallet.module.ts   # Wallet module configuration
├── categories/            # Category management module
│   ├── dto/              # Category DTOs
│   ├── category.entity.ts # Category database model
│   ├── category.controller.ts # Category endpoints
│   ├── category.service.ts # Category business logic
│   └── category.module.ts # Category module configuration
├── categoryTemplate/      # Category template module
│   ├── dto/              # Template DTOs
│   ├── category-template.entity.ts # Template database model
│   ├── category-template.controller.ts # Template endpoints
│   ├── category-template.service.ts # Template business logic
│   └── category-template.module.ts # Template module configuration
├── common/               # Shared utilities and configurations
│   ├── filters/         # Exception filters
│   ├── logging/         # Logging configuration
│   ├── middleware/      # Custom middleware
│   └── exceptions/      # Custom exceptions
├── health/              # Health check module
├── app.module.ts        # Root application module
└── main.ts             # Application entry point
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- Docker & Docker Compose (optional)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
APP_PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3303
DB_USERNAME=root
DB_PASSWORD=123456
DB_DATABASE=todo_db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=3600s

# CORS
CORS_ORIGIN=*
```

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finwallet/be
   ```

2. **Start the database**
   ```bash
   docker-compose up -d mysql
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

### Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up MySQL database**
   - Create a database named `todo_db`
   - Update `.env` with your database credentials

3. **Run migrations** (if using migrations)
   ```bash
   npm run migration:run
   ```

4. **Start the application**
   ```bash
   npm run start:dev
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "SecurePass123!",
  "phoneNumber": "+1234567890"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer <jwt_token>
```

#### Verify Token
```http
POST /auth/verify
Authorization: Bearer <jwt_token>
```

### User Management

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <jwt_token>
```

#### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+1234567890"
}
```

### Category Management

#### Get All Categories
```http
GET /categories
Authorization: Bearer <jwt_token>
```

#### Create Category
```http
POST /categories
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Groceries",
  "type": "expense",
  "parentId": null
}
```

#### Update Category
```http
PUT /categories/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Food & Dining",
  "type": "expense"
}
```

#### Delete Category
```http
DELETE /categories/:id
Authorization: Bearer <jwt_token>
```

### Category Templates

#### Get User Templates
```http
GET /category-templates
Authorization: Bearer <jwt_token>
```

#### Create Template
```http
POST /category-templates
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Personal Budget",
  "type": "expense",
  "parentId": null
}
```

### Wallet Management

#### Get User Wallets
```http
GET /wallets
Authorization: Bearer <jwt_token>
```

#### Create Wallet
```http
POST /wallets
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Main Wallet",
  "type": "basic",
  "currencyFormat": "USD",
  "currentBalance": 1000.00
}
```

## 🗄️ Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique email address
- `firstName`, `lastName`: User names
- `password`: Hashed password
- `role`: User role (user, admin, moderator)
- `status`: User status (active, inactive, suspended)
- `avatar`: Profile picture URL
- `phoneNumber`: Contact number
- `emailVerified`: Email verification status
- `lastLoginAt`: Last login timestamp
- `createdAt`, `updatedAt`: Timestamps

### Categories Table
- `id`: Primary key
- `name`: Category name
- `type`: Category type (expense, income, other)
- `parentId`: Parent category reference
- `isActive`: Category status

### Category Templates Table
- `id`: Primary key
- `name`: Template name
- `type`: Category type
- `parentId`: Parent category reference
- `userId`: User reference
- `isActive`: Template status

### Wallets Table
- `id`: Primary key
- `type`: Wallet type (basic, linked, goal, credit, other)
- `userId`: User reference
- `currencyFormat`: Currency format
- `currentBalance`: Current balance
- `enabled`: Wallet status
- `allowNotifications`: Notification settings
- `archived`: Archive status

## 🔧 Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode with hot reload
npm run start:debug        # Start in debug mode

# Production
npm run build              # Build the application
npm run start:prod         # Start in production mode

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests
```

### Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

### Testing

The project includes:
- **Unit tests** with Jest
- **E2E tests** for API endpoints
- **Test coverage** reporting

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Comprehensive DTO validation
- **CORS Protection**: Configurable CORS settings
- **Role-based Access**: User role management
- **Request Logging**: Comprehensive request/response logging

## 📊 Logging

The application uses Winston for structured logging with:
- **Console output** for development
- **File logging** for production
- **Request/response logging** middleware
- **Error tracking** with stack traces

## 🐳 Docker

### Development Environment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

1. Build the Docker image
2. Configure environment variables
3. Deploy to your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the logs for debugging

## 🔄 Version History

- **v0.0.1**: Initial release with basic authentication and CRUD operations