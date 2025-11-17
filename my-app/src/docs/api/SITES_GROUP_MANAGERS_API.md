# Sites Group Managers API

Base Path: `/api/v1/sites-group-managers`

## Overview
Manage manager assignments to site groups. This allows assigning users as managers for specific site groups within a company.

## Endpoints

### POST /sites-group-managers
Create a manager assignment to a site group.

**Authentication Required:** Yes
**Required Permission:** `manage.sitegroup.managers` (Admin + Superadmin)

**Request Body:**
```typescript
ReqModel<SitesGroupManagerCreateRequest>

interface SitesGroupManagerCreateRequest {
  site_group_id: number;    // Site group ID (required)
  manager_user_id: number;  // Manager user ID (required)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "site_group_id": 5,
    "manager_user_id": 10
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<SitesGroupManager>

interface SitesGroupManager {
  id: number;                   // Assignment ID
  site_group_id: number;
  manager_user_id: number;
  assigned_date: string;        // ISO 8601 datetime
  is_active: boolean;           // Whether assignment is active
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Manager assigned successfully",
  "res_data": {
    "id": 15,
    "site_group_id": 5,
    "manager_user_id": 10,
    "assigned_date": "2024-01-15T10:30:01Z",
    "is_active": true
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### GET /sites-group-managers
Get all manager-site group assignments.

**Authentication Required:** Yes
**Required Permission:** `read.sitegroup`

**Company Filtering:** Admin only sees assignments from their company's site groups.

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<SitesGroupManager[]>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Manager assignments retrieved successfully",
  "res_data": [
    {
      "id": 15,
      "site_group_id": 5,
      "manager_user_id": 10,
      "assigned_date": "2024-01-15T10:30:01Z",
      "is_active": true
    },
    {
      "id": 16,
      "site_group_id": 6,
      "manager_user_id": 12,
      "assigned_date": "2024-01-14T09:00:00Z",
      "is_active": true
    }
  ],
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### GET /sites-group-managers/{site_manager_id}
Get a specific manager assignment by ID.

**Authentication Required:** Yes
**Required Permission:** `read.sitegroup`

**Company Policy:** Admin can only view assignments from their company.

**Path Parameters:**
- `site_manager_id` (number, required): Assignment ID to retrieve

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<SitesGroupManager>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Manager assignment retrieved successfully",
  "res_data": {
    "id": 15,
    "site_group_id": 5,
    "manager_user_id": 10,
    "assigned_date": "2024-01-15T10:30:01Z",
    "is_active": true
  },
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### PUT /sites-group-managers/{id}
Update manager assignment (activate/deactivate).

**Authentication Required:** Yes
**Required Permission:** `manage.sitegroup.managers` (Admin + Superadmin)

**Company Policy:** Admin can only update assignments from their company's site groups.

**Path Parameters:**
- `id` (number, required): Assignment ID to update

**Request Body:**
```typescript
ReqModel<SitesGroupManagerUpdateRequest>

interface SitesGroupManagerUpdateRequest {
  id: number;           // Assignment ID (auto-filled from path)
  is_active: boolean;   // Whether assignment is active (required)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "id": 15,
    "is_active": false
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<SitesGroupManager>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Manager assignment updated successfully",
  "res_data": {
    "id": 15,
    "site_group_id": 5,
    "manager_user_id": 10,
    "assigned_date": "2024-01-15T10:30:01Z",
    "is_active": false
  },
  "timestamp": "2024-01-15T12:00:01Z"
}
```

---

### DELETE /sites-group-managers/{id}
Delete a manager assignment from a site group.

**Authentication Required:** Yes
**Required Permission:** `manage.sitegroup.managers` (Admin + Superadmin)

**Company Policy:** Admin can only delete assignments from their company's site groups.

**Path Parameters:**
- `id` (number, required): Assignment ID to delete

**Request Body:**
```typescript
ReqModel<SitesGroupManagerDeleteRequest>

interface SitesGroupManagerDeleteRequest {
  id: number;  // Assignment ID (auto-filled from path)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "id": 15
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
  "message": "Manager assignment deleted successfully",
  "res_data": {
    "id": 15,
    "deleted": true
  },
  "timestamp": "2024-01-15T13:00:01Z"
}
```

## Notes

- Managers are users assigned to oversee specific site groups
- Admin users can only assign managers to their company's site groups
- Assignments can be activated/deactivated using the PUT endpoint
- Company filtering automatically applies for non-Superadmin users
- Each assignment links a user (manager_user_id) to a site group (site_group_id)