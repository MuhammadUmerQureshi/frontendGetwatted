# Users API

Base Path: `/api/v1/users`

## Overview
Manage user accounts in the CSMS system. Users are created in both Keycloak (for authentication) and the local database.

## Endpoints

### POST /users
Create a new user in both Keycloak and database.

**Authentication Required:** Yes
**Required Permission:** `create.user`

**Request Body:**
```typescript
ReqModel<UserCreateRequest>

interface UserCreateRequest {
  user_data: UserCreate;
  password: string;  // User password for Keycloak
}

interface UserCreate {
  user_first_name: string;        // Max 100 characters (required)
  user_last_name: string;         // Max 100 characters (required)
  user_email: string;             // Email address, globally unique (required)
  user_phone?: string;            // Max 50 characters (optional)
  user_role_id?: number;          // Foreign key to user_roles (optional)
  user_company_id?: number;       // Foreign key to companies (optional)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "user_data": {
      "user_first_name": "John",
      "user_last_name": "Doe",
      "user_email": "john.doe@example.com",
      "user_phone": "+1234567890",
      "user_role_id": 2,
      "user_company_id": 1
    },
    "password": "SecurePassword123!"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<User>

interface User {
  user_id: number;
  user_keycloak_id: string;       // Keycloak user ID for authentication
  user_first_name?: string;
  user_last_name?: string;
  user_email?: string;            // Globally unique
  user_phone?: string;
  user_role_id?: number;
  user_company_id?: number;
  user_created: string;           // ISO 8601 datetime
  user_updated: string;           // ISO 8601 datetime
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User created successfully",
  "res_data": {
    "user_id": 5,
    "user_keycloak_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "user_first_name": "John",
    "user_last_name": "Doe",
    "user_email": "john.doe@example.com",
    "user_phone": "+1234567890",
    "user_role_id": 2,
    "user_company_id": 1,
    "user_created": "2024-01-15T10:30:01Z",
    "user_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### GET /users
Get all users from database.

**Authentication Required:** Yes
**Required Permission:** `read.user`

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<User[]>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Users retrieved successfully",
  "res_data": [
    {
      "user_id": 1,
      "user_keycloak_id": "keycloak-id-1",
      "user_first_name": "Jane",
      "user_last_name": "Smith",
      "user_email": "jane.smith@example.com",
      "user_phone": "+1234567891",
      "user_role_id": 1,
      "user_company_id": 1,
      "user_created": "2024-01-10T09:00:00Z",
      "user_updated": "2024-01-10T09:00:00Z"
    },
    {
      "user_id": 2,
      "user_keycloak_id": "keycloak-id-2",
      "user_first_name": "John",
      "user_last_name": "Doe",
      "user_email": "john.doe@example.com",
      "user_phone": "+1234567890",
      "user_role_id": 2,
      "user_company_id": 1,
      "user_created": "2024-01-15T10:30:01Z",
      "user_updated": "2024-01-15T10:30:01Z"
    }
  ],
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### GET /users/{user_id}
Get a specific user by ID.

**Authentication Required:** Yes
**Required Permission:** `read.user`

**Path Parameters:**
- `user_id` (number, required): User ID to retrieve

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<User>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User retrieved successfully",
  "res_data": {
    "user_id": 5,
    "user_keycloak_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "user_first_name": "John",
    "user_last_name": "Doe",
    "user_email": "john.doe@example.com",
    "user_phone": "+1234567890",
    "user_role_id": 2,
    "user_company_id": 1,
    "user_created": "2024-01-15T10:30:01Z",
    "user_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### PUT /users/{user_id}
Update a user in both database and Keycloak.

**Authentication Required:** Yes
**Required Permission:** `update.user`

**Path Parameters:**
- `user_id` (number, required): User ID to update

**Request Body:**
```typescript
ReqModel<UserUpdateRequest>

interface UserUpdateRequest {
  user_id: number;           // User ID to update (auto-filled from path)
  user_data: UserUpdate;
}

interface UserUpdate {
  user_first_name?: string;   // Max 100 characters
  user_last_name?: string;    // Max 100 characters
  user_email?: string;        // Globally unique
  user_phone?: string;        // Max 50 characters
  user_role_id?: number;
  user_company_id?: number;
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "user_id": 5,
    "user_data": {
      "user_phone": "+1987654321",
      "user_role_id": 3
    }
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<User>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User updated successfully",
  "res_data": {
    "user_id": 5,
    "user_keycloak_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "user_first_name": "John",
    "user_last_name": "Doe",
    "user_email": "john.doe@example.com",
    "user_phone": "+1987654321",
    "user_role_id": 3,
    "user_company_id": 1,
    "user_created": "2024-01-15T10:30:01Z",
    "user_updated": "2024-01-15T12:00:01Z"
  },
  "timestamp": "2024-01-15T12:00:01Z"
}
```

---

### DELETE /users/{user_id}
Delete a user from both database and Keycloak.

**Authentication Required:** Yes
**Required Permission:** `delete.user`

**Path Parameters:**
- `user_id` (number, required): User ID to delete

**Request Body:**
```typescript
ReqModel<UserDeleteRequest>

interface UserDeleteRequest {
  user_id: number;  // User ID to delete (auto-filled from path)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "user_id": 5
  },
  "timestamp": "2024-01-15T13:00:00Z"
}
```

**Response:**
```typescript
ResModel<{}>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User deleted successfully",
  "res_data": {
    "user_id": 5,
    "deleted": true
  },
  "timestamp": "2024-01-15T13:00:01Z"
}
```

## Notes

- All user operations sync between local database and Keycloak
- Email addresses must be globally unique across the system
- When creating users, the password is set in Keycloak for authentication
- Users are associated with companies and roles for access control