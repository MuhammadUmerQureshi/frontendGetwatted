# Sites Group API

Base Path: `/api/v1/sites-groups`

## Overview
Manage site groups in the CSMS system. Site groups allow organizing multiple sites for easier management within a company.

## Endpoints

### POST /sites-groups
Create a new site group.

**Authentication Required:** Yes
**Required Permission:** `create.sitegroup` (Admin + Superadmin)

**Request Body:**
```typescript
ReqModel<SitesGroupCreate>

interface SitesGroupCreate {
  site_company_id: number;        // Company ID (required)
  site_group_name: string;        // Max 255 characters (required)
  site_group_enabled: boolean;    // Default: true
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "site_company_id": 1,
    "site_group_name": "Downtown Locations",
    "site_group_enabled": true
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<SitesGroup>

interface SitesGroup {
  site_group_id: number;
  site_company_id: number;
  site_group_name: string;
  site_group_enabled: boolean;
  site_group_created: string;     // ISO 8601 datetime
  site_group_updated: string;     // ISO 8601 datetime
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Site group created successfully",
  "res_data": {
    "site_group_id": 5,
    "site_company_id": 1,
    "site_group_name": "Downtown Locations",
    "site_group_enabled": true,
    "site_group_created": "2024-01-15T10:30:01Z",
    "site_group_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### GET /sites-groups
Get all site groups.

**Authentication Required:** Yes
**Required Permission:** `read.sitegroup`

**Company Filtering:** Admin users only see site groups from their company.

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<SitesGroup[]>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Site groups retrieved successfully",
  "res_data": [
    {
      "site_group_id": 5,
      "site_company_id": 1,
      "site_group_name": "Downtown Locations",
      "site_group_enabled": true,
      "site_group_created": "2024-01-15T10:30:01Z",
      "site_group_updated": "2024-01-15T10:30:01Z"
    }
  ],
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### GET /sites-groups/{site_group_id}
Get a specific site group by ID.

**Authentication Required:** Yes
**Required Permission:** `read.sitegroup`

**Company Policy:** Admin can only view site groups from their company.

**Path Parameters:**
- `site_group_id` (number, required): Site group ID to retrieve

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<SitesGroup>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Site group retrieved successfully",
  "res_data": {
    "site_group_id": 5,
    "site_company_id": 1,
    "site_group_name": "Downtown Locations",
    "site_group_enabled": true,
    "site_group_created": "2024-01-15T10:30:01Z",
    "site_group_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### PUT /sites-groups/{site_group_id}
Update a site group.

**Authentication Required:** Yes
**Required Permission:** `update.sitegroup` (Admin + Superadmin)

**Company Policy:** Admin can only update site groups from their company.

**Path Parameters:**
- `site_group_id` (number, required): Site group ID to update

**Request Body:**
```typescript
ReqModel<SitesGroupUpdate>

interface SitesGroupUpdate {
  site_group_name?: string;       // Max 255 characters
  site_group_enabled?: boolean;
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "site_group_name": "Downtown & Suburban Locations"
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<SitesGroup>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Site group updated successfully",
  "res_data": {
    "site_group_id": 5,
    "site_company_id": 1,
    "site_group_name": "Downtown & Suburban Locations",
    "site_group_enabled": true,
    "site_group_created": "2024-01-15T10:30:01Z",
    "site_group_updated": "2024-01-15T12:00:01Z"
  },
  "timestamp": "2024-01-15T12:00:01Z"
}
```

---

### DELETE /sites-groups/{site_group_id}
Delete a site group.

**Authentication Required:** Yes
**Required Permission:** `delete.sitegroup` (Admin + Superadmin)

**Company Policy:** Admin can only delete site groups from their company.

**Path Parameters:**
- `site_group_id` (number, required): Site group ID to delete

**Request Body:**
```typescript
ReqModel<SitesGroupDelete>

interface SitesGroupDelete {
  site_group_id: number;  // Auto-filled from path
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "site_group_id": 5
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
  "message": "Site group deleted successfully",
  "res_data": {
    "site_group_id": 5,
    "deleted": true
  },
  "timestamp": "2024-01-15T13:00:01Z"
}
```

## Notes

- Admin users can only create site groups for their company
- Company filtering automatically applies for non-Superadmin users
- Sites can be assigned to site groups for organizational purposes
- Site group managers can be assigned via the Sites Group Managers API
