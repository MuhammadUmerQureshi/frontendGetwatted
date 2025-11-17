# Auth API

Base Path: `/api/v1/auth`

## Endpoints

### POST /auth/login
Authenticate user with Keycloak and return JWT tokens.

**Authentication Required:** No

**Query Parameters:**
- `ch` (optional): Charger name from QR code
- `co` (optional): Connector ID from QR code

Note: When using QR code authentication, both `ch` and `co` must be provided together. The response will include charger information for direct access.

**Request Body:**
```typescript
ReqModel<LoginRequest>

interface LoginRequest {
  username: string;  // Username for authentication
  password: string;  // Password for authentication
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "username": "john@example.com",
    "password": "mySecurePassword123"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Request Example (with QR code):**
```
POST /api/v1/auth/login?ch=CP001&co=1
```

**Response:**
```typescript
ResModel<LoginResponse>

interface LoginResponse {
  access_token: string;         // JWT access token
  token_type: string;           // Token type (usually 'Bearer')
  expires_in: number;           // Token expiration time in seconds
  refresh_token?: string;       // Refresh token for token renewal (optional)
  charger_info?: ChargerInfo;   // Charger info if logged in via QR code (optional)
}

interface ChargerInfo {
  cp_id: number;         // ChargePoint ID
  cp_name: string;       // ChargePoint name
  connector_id: number;  // Connector ID
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Login successful",
  "res_data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

**Success Response Example (with QR code):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Login successful with charger access",
  "res_data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "charger_info": {
      "cp_id": 5,
      "cp_name": "CP001",
      "connector_id": 1
    }
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

**Error Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": false,
  "message": "Invalid credentials",
  "res_data": null,
  "timestamp": "2024-01-15T10:30:01Z",
  "error_code": "AUTHENTICATION_FAILED"
}
```

## Usage in Frontend

### Storing the Token
After successful login, store the `access_token` in your frontend application (localStorage, sessionStorage, or state management):

```typescript
const loginResponse = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: generateUUID(),
    req_data: {
      username: 'john@example.com',
      password: 'myPassword123'
    },
    timestamp: new Date().toISOString()
  })
});

const result = await loginResponse.json();

if (result.status) {
  // Store token for future requests
  localStorage.setItem('access_token', result.res_data.access_token);
  localStorage.setItem('token_type', result.res_data.token_type);

  // If QR code login, store charger info
  if (result.res_data.charger_info) {
    localStorage.setItem('charger_info', JSON.stringify(result.res_data.charger_info));
  }
}
```

### Using the Token
Include the token in the Authorization header for all subsequent requests:

```typescript
const response = await fetch('/api/v1/users', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  }
});
```

### Token Expiration
The `expires_in` field indicates the token validity duration in seconds. Implement token refresh logic or re-authentication before expiration.

## QR Code Login Flow

1. User scans QR code on charger (contains `ch` and `co` parameters)
2. Frontend extracts QR code parameters and includes them in login request
3. Backend validates credentials and charger access
4. Response includes both authentication token and charger information
5. Frontend can use charger info to directly show charging controls for that specific charger/connector