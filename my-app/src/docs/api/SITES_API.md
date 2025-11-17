# Sites API

Base Path: `/api/v1/sites`

## Overview
Manage physical sites/locations where charge points are installed. Sites belong to companies and can be organized into site groups.

## Endpoints

### POST /sites
Create a new site.

**Authentication Required:** Yes
**Required Permission:** `create.site` (Admin + Superadmin)

**Request Body:**
```typescript
ReqModel<SiteCreateRequest>

interface SiteCreateRequest {
  site_company_id: number;          // Company ID (required)
  site_name: string;                // Max 255 characters (required)
  site_enabled: boolean;            // Default: true
  site_group_id?: number;           // Site group ID (optional)
  site_manager_id?: number;         // Site manager user ID (optional)
  site_address?: string;            // Max 255 characters
  site_city?: string;               // Max 100 characters
  site_region?: string;             // Max 100 characters
  site_country?: string;            // Max 100 characters
  site_zip_code?: string;           // Max 20 characters
  site_geo_coord?: string;          // Max 100 characters
  site_tax_rate?: string;           // Decimal as string
  site_contact_name?: string;       // Max 255 characters
  site_contact_ph?: string;         // Max 50 characters
  site_contact_email?: string;      // Max 255 characters
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "site_company_id": 1,
    "site_name": "Downtown Charging Hub",
    "site_enabled": true,
    "site_group_id": 5,
    "site_address": "123 Main Street",
    "site_city": "San Francisco",
    "site_region": "California",
    "site_country": "USA",
    "site_zip_code": "94102",
    "site_tax_rate": "0.0875",
    "site_contact_name": "John Manager",
    "site_contact_ph": "+14155551234",
    "site_contact_email": "john@example.com"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<Site>

interface Site {
  site_id: number;
  site_company_id: number;
  site_name: string;
  site_enabled: boolean;
  site_group_id?: number;
  site_manager_id?: number;
  site_address?: string;
  site_city?: string;
  site_region?: string;
  site_country?: string;
  site_zip_code?: string;
  site_geo_coord?: string;
  site_tax_rate?: string;          // Decimal as string
  site_contact_name?: string;
  site_contact_ph?: string;
  site_contact_email?: string;
  site_created: string;            // ISO 8601 datetime
  site_updated: string;            // ISO 8601 datetime
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Site created successfully",
  "res_data": {
    "site_id": 20,
    "site_company_id": 1,
    "site_name": "Downtown Charging Hub",
    "site_enabled": true,
    "site_group_id": 5,
    "site_manager_id": null,
    "site_address": "123 Main Street",
    "site_city": "San Francisco",
    "site_region": "California",
    "site_country": "USA",
    "site_zip_code": "94102",
    "site_geo_coord": null,
    "site_tax_rate": "0.0875",
    "site_contact_name": "John Manager",
    "site_contact_ph": "+14155551234",
    "site_contact_email": "john@example.com",
    "site_created": "2024-01-15T10:30:01Z",
    "site_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### GET /sites
Get all sites.

**Authentication Required:** Yes
**Required Permission:** `read.site`

**Company Filtering:** Admin only sees sites from their company.

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<Site[]>
```

---

### GET /sites/{site_id}
Get a specific site by ID.

**Authentication Required:** Yes
**Required Permission:** `read.site`

**Path Parameters:**
- `site_id` (number, required): Site ID to retrieve

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<Site>
```

---

### PUT /sites/{site_id}
Update a site.

**Authentication Required:** Yes
**Required Permission:** `update.site` (Admin + Superadmin)

**Path Parameters:**
- `site_id` (number, required): Site ID to update

**Request Body:**
```typescript
ReqModel<SiteUpdateRequest>

interface SiteUpdateRequest {
  site_name?: string;
  site_enabled?: boolean;
  site_group_id?: number;
  site_manager_id?: number;
  site_address?: string;
  site_city?: string;
  site_region?: string;
  site_country?: string;
  site_zip_code?: string;
  site_geo_coord?: string;
  site_tax_rate?: string;
  site_contact_name?: string;
  site_contact_ph?: string;
  site_contact_email?: string;
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "site_contact_ph": "+14155559999"
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<Site>
```

---

### DELETE /sites/{site_id}
Delete a site.

**Authentication Required:** Yes
**Required Permission:** `delete.site` (Admin + Superadmin)

**Path Parameters:**
- `site_id` (number, required): Site ID to delete

**Request Body:**
```typescript
ReqModel<SiteDeleteRequest>

interface SiteDeleteRequest {
  site_id: number;  // Auto-filled from path
}
```

**Response:**
```typescript
ResModel<{}>
```

## Notes

- Admin users can only create sites for their company
- Sites can be organized into site groups
- Tax rate is stored as a decimal string for precision
- Geographic coordinates can be stored in site_geo_coord
- Company filtering automatically applies for non-Superadmin users