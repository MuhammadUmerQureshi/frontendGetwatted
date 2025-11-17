# Getwatted-CSMS API Documentation

Complete API documentation for frontend developers to integrate with the Getwatted-CSMS backend.

## Getting Started

Start with the [API Overview](./API_OVERVIEW.md) to understand:
- Base URL and authentication
- Standard request/response wrappers
- Common data types and formats
- Permission system

## API Documentation

### Authentication
- [Auth API](./AUTH_API.md) - Login and JWT token management

### User Management
- [Users API](./USERS_API.md) - User CRUD operations
- [User Roles API](./USER_ROLES_API.md) - Role management with Keycloak sync

### Company & Organization
- [Companies API](./COMPANIES_API.md) - Company management
- [Sites Group API](./SITES_GROUP_API.md) - Site group organization
- [Sites Group Managers API](./SITES_GROUP_MANAGERS_API.md) - Manager assignments
- [Sites API](./SITES_API.md) - Physical site/location management

### Pricing
- [Tariffs API](./TARIFFS_API.md) - Pricing and tariff management

### Driver Management
- [Drivers Group API](./DRIVERS_GROUP_API.md) - Driver group organization
- [Drivers API](./DRIVERS_API.md) - Driver profiles and preferences
- [RFID Cards API](./RFID_CARDS_API.md) - RFID card authentication

### Charging Infrastructure
- [ChargePoints API](./CHARGEPOINTS_API.md) - Charge point management
- [Connectors API](./CONNECTORS_API.md) - Connector management (OCPP 1.6)
- [Charge Sessions API](./CHARGE_SESSIONS_API.md) - Charging transaction tracking

### Remote Operations
- [Remote Commands API](./REMOTE_COMMANDS_API.md) - OCPP remote commands (start/stop/reset)

## Quick Reference

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Header
```http
Authorization: Bearer <your_jwt_token>
```

### Standard Request Format
```json
{
  "id": "uuid",
  "req_data": { /* your data */ },
  "timestamp": "ISO-8601-datetime"
}
```

### Standard Response Format
```json
{
  "id": "uuid",
  "status": true/false,
  "message": "human-readable-message",
  "res_data": { /* response data */ },
  "timestamp": "ISO-8601-datetime"
}
```

## API Endpoint Summary

| Module | Base Path | Endpoints |
|--------|-----------|-----------|
| Auth | `/auth` | 1 endpoint |
| Users | `/users` | 5 endpoints |
| User Roles | `/user_roles` | 5 endpoints |
| Companies | `/companies` | 5 endpoints |
| Sites Groups | `/sites-groups` | 5 endpoints |
| Sites Group Managers | `/sites-group-managers` | 5 endpoints |
| Sites | `/sites` | 5 endpoints |
| Tariffs | `/tariffs` | 5 endpoints |
| Drivers Groups | `/drivers-groups` | 5 endpoints |
| Drivers | `/drivers` | 5 endpoints |
| ChargePoints | `/chargepoints` | 5 endpoints |
| RFID Cards | `/rfidcards` | 6 endpoints |
| Connectors | `/connectors` | 4 endpoints |
| Charge Sessions | `/chargesessions` | 9 endpoints |
| Remote Commands | `/remote_commands` | 4 endpoints |

**Total: 15 modules, 74 endpoints**

## Common Patterns

### Creating Resources
All POST requests use `ReqModel<T>` wrapper:
```typescript
{
  "id": "uuid",
  "req_data": {
    // Your creation data here
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Updating Resources
All PUT requests use `ReqModel<T>` wrapper with path parameters:
```
PUT /api/v1/users/{user_id}
```

### Deleting Resources
All DELETE requests use `ReqModel<T>` wrapper:
```
DELETE /api/v1/users/{user_id}
```

### Getting Resources
- GET requests for single items: `GET /api/v1/users/{user_id}`
- GET requests for lists: `GET /api/v1/users`

## Permission System

Most endpoints require specific permissions. Common prefixes:

- `create.*` - Create resources
- `read.*` - Read/view resources
- `update.*` - Update resources
- `delete.*` - Delete resources
- `ocpp.*` - OCPP remote commands
- `manage.*` - Special management operations

## Company Filtering

For non-Superadmin users, data is automatically filtered by company:
- Admins can only see and manage resources in their company
- Superadmins can see and manage all resources across all companies

## Data Types

### DateTime
ISO 8601 format: `2024-01-15T10:30:00Z`

### Time
24-hour format: `09:00:00`

### Decimal
Stored as strings for precision: `"0.0875"`, `"240.5"`

## Error Responses

When `status: false`, check:
- `message` - Human-readable error
- `error_code` - Machine-readable error code (optional)
- `error_details` - Additional error information (optional)

## Development Notes

- All requests require JWT authentication (except `/auth/login`)
- Token expires after time specified in `expires_in` (typically 3600 seconds)
- Use refresh tokens to obtain new access tokens
- WebSocket connections for OCPP are separate from REST API

## Support

For issues or questions about the API:
- Check the specific endpoint documentation
- Review the API Overview for standard patterns
- Ensure your JWT token is valid and not expired
- Verify you have the required permissions

---

**Last Updated:** 2024-01-15
**API Version:** 1.0.0
**OCPP Version:** 1.6