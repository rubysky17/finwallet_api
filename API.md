# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "SecurePass123!",
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "status": "active",
      "avatar": null,
      "emailVerified": false
    }
  }
}
```

### 2. Login
**POST** `/auth/login`

Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "status": "active",
      "avatar": null,
      "emailVerified": false
    }
  }
}
```

### 3. Refresh Token
**POST** `/auth/refresh`

Refresh the access token.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Token refreshed successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 4. Verify Token
**POST** `/auth/verify`

Verify if the current token is valid.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Token is valid",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "user",
      "status": "active"
    }
  }
}
```

### 5. Logout
**POST** `/auth/logout`

Logout user (token invalidation).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

## User Management Endpoints

### 1. Get User Profile
**GET** `/users/profile`

Get current user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Profile retrieved successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "status": "active",
    "avatar": null,
    "phoneNumber": "+1234567890",
    "emailVerified": false,
    "lastLoginAt": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 2. Update Profile
**PATCH** `/users/profile`

Update current user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+1234567890",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "user",
    "status": "active",
    "avatar": "https://example.com/avatar.jpg",
    "phoneNumber": "+1234567890",
    "emailVerified": false,
    "lastLoginAt": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T13:00:00.000Z"
  }
}
```

### 3. Get All Users (Admin/Moderator)
**GET** `/users`

Get list of all users (requires ADMIN or MODERATOR role).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "status": "active",
      "avatar": null,
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### 4. Get User by ID (Admin/Moderator)
**GET** `/users/:id`

Get specific user by ID (requires ADMIN or MODERATOR role).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "User retrieved successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "status": "active",
    "avatar": null,
    "phoneNumber": "+1234567890",
    "emailVerified": false,
    "lastLoginAt": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 5. Update User (Admin)
**PATCH** `/users/:id`

Update specific user (requires ADMIN role).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "status": "active",
  "role": "admin"
}
```

**Response:**
```json
{
  "message": "User updated successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "status": "active",
    "avatar": null,
    "phoneNumber": "+1234567890",
    "emailVerified": false,
    "lastLoginAt": "2024-01-01T12:00:00.000Z",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T13:00:00.000Z"
  }
}
```

### 6. Delete User (Admin)
**DELETE** `/users/:id`

Delete specific user (requires ADMIN role).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

### 7. Get Active Users (Admin/Moderator)
**GET** `/users/active/list`

Get list of active users only (requires ADMIN or MODERATOR role).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Active users retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "avatar": null,
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### 8. Get Users by Role (Admin)
**GET** `/users/role/:role`

Get users by specific role (requires ADMIN role).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Users with role admin retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "email": "admin@example.com",
      "firstName": "Admin",
      "lastName": "User",
      "status": "active",
      "avatar": null,
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### 9. Get User Statistics (Admin)
**GET** `/users/stats/count`

Get total user count (requires ADMIN role).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "User count retrieved successfully",
  "data": {
    "count": 150
  }
}
```

### 10. Check Email Availability
**GET** `/users/check-email/:email`

Check if an email is available for registration.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "message": "Email availability checked successfully",
  "data": {
    "isAvailable": true
  }
}
```

## Health Check

### Health Status
**GET** `/health`

Check application health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

## Error Responses

### Validation Error
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 8 characters"
  ],
  "error": "Bad Request"
}
```

### Unauthorized Error
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### Forbidden Error
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### Not Found Error
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

### Conflict Error
```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## User Roles

- **USER**: Basic user with limited access
- **MODERATOR**: Can view users and manage basic operations
- **ADMIN**: Full access to all operations

## User Status

- **ACTIVE**: User can access the system
- **INACTIVE**: User account is disabled
- **SUSPENDED**: User account is temporarily suspended

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider implementing rate limiting for authentication endpoints.

## CORS

CORS is enabled for all origins in development. For production, configure specific origins. 