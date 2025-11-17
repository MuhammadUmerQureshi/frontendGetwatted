# User Roles API

Base Path: `/api/v1/user_roles`

## Overview
Manage user roles in the CSMS system. Roles are created in both Keycloak realm and the local database. Roles define permission levels for users.

## Endpoints

### POST /user_roles
Create a new user role in both database and Keycloak realm.

**Authentication Required:** Yes
**Required Permission:** `create.role` (Superadmin only)

**Request Body:**
```typescript
ReqModel<UserRoleCreateRequest>

interface UserRoleCreateRequest {
  user_role_data: UserRoleCreate;
}

interface UserRoleCreate {
  user_role_name: string;     // Role name, max 255 characters, globally unique (required)
  user_role_level: number;    // Role level/priority, default: 40 (driver level)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "user_role_data": {
      "user_role_name": "Site Manager",
      "user_role_level": 30
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<UserRole>

interface UserRole {
  user_role_id: number;
  user_role_name: string;         // Globally unique
  user_role_level: number;        // Role level/priority
  user_role_created: string;      // ISO 8601 datetime
  user_role_updated: string;      // ISO 8601 datetime
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User role created successfully",
  "res_data": {
    "user_role_id": 5,
    "user_role_name": "Site Manager",
    "user_role_level": 30,
    "user_role_created": "2024-01-15T10:30:01Z",
    "user_role_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### GET /user_roles
Get all user roles from database.

**Authentication Required:** Yes
**Required Permission:** `read.role` (Superadmin only)

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<UserRole[]>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User roles retrieved successfully",
  "res_data": [
    {
      "user_role_id": 1,
      "user_role_name": "Superadmin",
      "user_role_level": 10,
      "user_role_created": "2024-01-01T00:00:00Z",
      "user_role_updated": "2024-01-01T00:00:00Z"
    },
    {
      "user_role_id": 2,
      "user_role_name": "Admin",
      "user_role_level": 20,
      "user_role_created": "2024-01-01T00:00:00Z",
      "user_role_updated": "2024-01-01T00:00:00Z"
    },
    {
      "user_role_id": 5,
      "user_role_name": "Site Manager",
      "user_role_level": 30,
      "user_role_created": "2024-01-15T10:30:01Z",
      "user_role_updated": "2024-01-15T10:30:01Z"
    }
  ],
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### GET /user_roles/{role_id}
Get a specific user role by ID.

**Authentication Required:** Yes
**Required Permission:** `read.role` (Superadmin only)

**Path Parameters:**
- `role_id` (number, required): User role ID to retrieve

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<UserRole>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User role retrieved successfully",
  "res_data": {
    "user_role_id": 5,
    "user_role_name": "Site Manager",
    "user_role_level": 30,
    "user_role_created": "2024-01-15T10:30:01Z",
    "user_role_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### PUT /user_roles/{role_id}
Update a user role in both database and Keycloak realm.

**Authentication Required:** Yes
**Required Permission:** `update.role` (Superadmin only)

**Path Parameters:**
- `role_id` (number, required): User role ID to update

**Request Body:**
```typescript
ReqModel<UserRoleUpdateRequest>

interface UserRoleUpdateRequest {
  user_role_id: number;              // Role ID to update (auto-filled from path)
  user_role_data?: UserRoleUpdate;
}

interface UserRoleUpdate {
  user_role_name?: string;    // Role name, max 255 characters, globally unique
  user_role_level?: number;   // Role level/priority
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "user_role_id": 5,
    "user_role_data": {
      "user_role_level": 25
    }
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<UserRole>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User role updated successfully",
  "res_data": {
    "user_role_id": 5,
    "user_role_name": "Site Manager",
    "user_role_level": 25,
    "user_role_created": "2024-01-15T10:30:01Z",
    "user_role_updated": "2024-01-15T12:00:01Z"
  },
  "timestamp": "2024-01-15T12:00:01Z"
}
```

---

### DELETE /user_roles/{role_id}
Delete a user role from both database and Keycloak realm.

**Authentication Required:** Yes
**Required Permission:** `delete.role` (Superadmin only)

**Path Parameters:**
- `role_id` (number, required): User role ID to delete

**Request Body:**
```typescript
ReqModel<UserRoleDeleteRequest>

interface UserRoleDeleteRequest {
  user_role_id: number;  // Role ID to delete (auto-filled from path)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "user_role_id": 5
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
  "message": "User role deleted successfully",
  "res_data": {
    "user_role_id": 5,
    "deleted": true
  },
  "timestamp": "2024-01-15T13:00:01Z"
}
```

## Notes

- All role operations sync between local database and Keycloak
- Role names must be globally unique across the system
- Role level determines the hierarchy (lower number = higher privilege)
- All user role endpoints require Superadmin permissions
- Deleting a role may affect users assigned to that role