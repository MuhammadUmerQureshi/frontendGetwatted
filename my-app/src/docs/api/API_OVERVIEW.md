# Getwatted-CSMS API Overview

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication

### Bearer Token Authentication
All endpoints (except `/auth/login`) require JWT Bearer token authentication.

**Headers:**
```http
Authorization: Bearer <your_jwt_token>
```

To obtain a token, use the `/auth/login` endpoint (see [Auth API](./AUTH_API.md)).

## Standard Request/Response Wrappers

### Request Wrapper: `ReqModel<T>`

All POST, PUT, DELETE requests use a standardized request wrapper:

```typescript
interface ReqModel<T> {
  id: string;           // Request UUID for tracking (auto-generated if not provided)
  req_data: T;          // Your actual request payload
  timestamp: string;    // Request timestamp (ISO 8601 format, auto-generated)
}
```

**Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "username": "john@example.com",
    "password": "password123"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Response Wrapper: `ResModel<U>`

All endpoints return a standardized response wrapper:

```typescript
interface ResModel<U> {
  id: string;              // Request ID for correlation
  status: boolean;         // Success (true) or failure (false)
  message: string;         // Human readable message
  res_data: U | null;      // Response payload (null if error)
  timestamp: string;       // Response timestamp (ISO 8601 format)
  error_code?: string;     // Error code for failed requests (optional)
  error_details?: object;  // Additional error information (optional)
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "User created successfully",
  "res_data": {
    "user_id": 1,
    "user_email": "john@example.com",
    "user_first_name": "John"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

**Error Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": false,
  "message": "User not found",
  "res_data": null,
  "timestamp": "2024-01-15T10:30:01Z",
  "error_code": "USER_NOT_FOUND",
  "error_details": {
    "user_id": 999
  }
}
```

### Empty Request

For GET requests that don't require a body, the backend uses `EmptyRequest`:

```typescript
interface EmptyRequest {}
```

## API Endpoints

### Authentication
- [Auth API](./AUTH_API.md) - Login and authentication

### User Management
- [Users API](./USERS_API.md) - User CRUD operations
- [User Roles API](./USER_ROLES_API.md) - User roles management

### Company & Site Management
- [Companies API](./COMPANIES_API.md) - Company management
- [Sites Group API](./SITES_GROUP_API.md) - Site groups management
- [Sites Group Managers API](./SITES_GROUP_MANAGERS_API.md) - Site group managers
- [Sites API](./SITES_API.md) - Site management

### Tariff Management
- [Tariffs API](./TARIFFS_API.md) - Pricing and tariff management

### Driver Management
- [Drivers Group API](./DRIVERS_GROUP_API.md) - Driver groups management
- [Drivers API](./DRIVERS_API.md) - Driver management
- [RFID Cards API](./RFID_CARDS_API.md) - RFID card management

### Charging Infrastructure
- [ChargePoints API](./CHARGEPOINTS_API.md) - Charge point management
- [Connectors API](./CONNECTORS_API.md) - Connector management
- [Charge Sessions API](./CHARGE_SESSIONS_API.md) - Charging session tracking

### Remote Operations
- [Remote Commands API](./REMOTE_COMMANDS_API.md) - OCPP remote commands

## Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Response Status Field

The `status` field in the response wrapper indicates:
- `true` - Operation successful
- `false` - Operation failed (check `message`, `error_code`, and `error_details`)

## Data Types

### DateTime Format
All datetime fields use ISO 8601 format:
```
2024-01-15T10:30:00Z
```

### Time Format
Time fields (operating hours, etc.) use HH:MM:SS format:
```
09:00:00
```

### Decimal Format
Decimal fields (prices, coordinates, etc.) are returned as strings to preserve precision:
```json
{
  "cp_latitude": "40.7128",
  "cp_longitude": "-74.0060"
}
```

## Permissions

Most endpoints require specific permissions. The required permission is documented in each endpoint's description. Common permission prefixes:

- `create.*` - Create resources
- `read.*` - Read/view resources
- `update.*` - Update resources
- `delete.*` - Delete resources
- `ocpp.*` - OCPP remote commands

## Company Filtering

For non-Superadmin users, most endpoints automatically filter data by the user's company. This means:
- Users can only see and manage resources belonging to their company
- Superadmin users can see and manage all resources across all companies