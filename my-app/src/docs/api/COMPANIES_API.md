# Companies API

Base Path: `/api/v1/companies`

## Overview
Manage companies in the CSMS system. Companies are the top-level organizational unit that owns sites, charge points, and users.

## Endpoints

### POST /companies
Create a new company.

**Authentication Required:** Yes
**Required Permission:** `create.company` (Superadmin only)

**Request Body:**
```typescript
ReqModel<CompanyCreateRequest>

interface CompanyCreateRequest {
  company_data: CompanyCreate;
}

interface CompanyCreate {
  company_name: string;              // Max 255 characters, globally unique (required)
  company_enabled: boolean;          // Default: false
  company_home_photo?: string;       // Home photo URL, max 255 characters
  company_brand_colour?: string;     // Brand color, max 50 characters
  company_brand_logo?: string;       // Brand logo URL, max 255 characters
  company_brand_favicon?: string;    // Favicon URL, max 255 characters
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "company_data": {
      "company_name": "Acme Charging Solutions",
      "company_enabled": true,
      "company_brand_colour": "#0066CC",
      "company_brand_logo": "https://example.com/logo.png"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<Company>

interface Company {
  company_id: number;
  company_name: string;             // Globally unique
  company_enabled: boolean;
  company_home_photo?: string;
  company_brand_colour?: string;
  company_brand_logo?: string;
  company_brand_favicon?: string;
  company_created: string;          // ISO 8601 datetime
  company_updated: string;          // ISO 8601 datetime
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Company created successfully",
  "res_data": {
    "company_id": 3,
    "company_name": "Acme Charging Solutions",
    "company_enabled": true,
    "company_home_photo": null,
    "company_brand_colour": "#0066CC",
    "company_brand_logo": "https://example.com/logo.png",
    "company_brand_favicon": null,
    "company_created": "2024-01-15T10:30:01Z",
    "company_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### GET /companies
Get all companies from database.

**Authentication Required:** Yes
**Required Permission:** `read.company`

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<Company[]>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Companies retrieved successfully",
  "res_data": [
    {
      "company_id": 1,
      "company_name": "Main Company",
      "company_enabled": true,
      "company_home_photo": null,
      "company_brand_colour": "#FF5733",
      "company_brand_logo": "https://example.com/main-logo.png",
      "company_brand_favicon": null,
      "company_created": "2024-01-01T00:00:00Z",
      "company_updated": "2024-01-01T00:00:00Z"
    },
    {
      "company_id": 3,
      "company_name": "Acme Charging Solutions",
      "company_enabled": true,
      "company_home_photo": null,
      "company_brand_colour": "#0066CC",
      "company_brand_logo": "https://example.com/logo.png",
      "company_brand_favicon": null,
      "company_created": "2024-01-15T10:30:01Z",
      "company_updated": "2024-01-15T10:30:01Z"
    }
  ],
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### GET /companies/{company_id}
Get a specific company by ID.

**Authentication Required:** Yes
**Required Permission:** `read.company`

**Path Parameters:**
- `company_id` (number, required): Company ID to retrieve

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<Company>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Company retrieved successfully",
  "res_data": {
    "company_id": 3,
    "company_name": "Acme Charging Solutions",
    "company_enabled": true,
    "company_home_photo": null,
    "company_brand_colour": "#0066CC",
    "company_brand_logo": "https://example.com/logo.png",
    "company_brand_favicon": null,
    "company_created": "2024-01-15T10:30:01Z",
    "company_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### PUT /companies/{company_id}
Update a company.

**Authentication Required:** Yes
**Required Permission:** `update.company` (Superadmin + Admin for own company)

**Path Parameters:**
- `company_id` (number, required): Company ID to update

**Request Body:**
```typescript
ReqModel<CompanyUpdateRequest>

interface CompanyUpdateRequest {
  company_id: number;              // Company ID to update (auto-filled from path)
  company_data: CompanyUpdate;
}

interface CompanyUpdate {
  company_name?: string;            // Max 255 characters, globally unique
  company_enabled?: boolean;
  company_home_photo?: string;      // Max 255 characters
  company_brand_colour?: string;    // Max 50 characters
  company_brand_logo?: string;      // Max 255 characters
  company_brand_favicon?: string;   // Max 255 characters
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "company_id": 3,
    "company_data": {
      "company_brand_colour": "#0099FF",
      "company_brand_favicon": "https://example.com/favicon.ico"
    }
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<Company>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Company updated successfully",
  "res_data": {
    "company_id": 3,
    "company_name": "Acme Charging Solutions",
    "company_enabled": true,
    "company_home_photo": null,
    "company_brand_colour": "#0099FF",
    "company_brand_logo": "https://example.com/logo.png",
    "company_brand_favicon": "https://example.com/favicon.ico",
    "company_created": "2024-01-15T10:30:01Z",
    "company_updated": "2024-01-15T12:00:01Z"
  },
  "timestamp": "2024-01-15T12:00:01Z"
}
```

---

### DELETE /companies/{company_id}
Delete a company from database.

**Authentication Required:** Yes
**Required Permission:** `delete.company` (Superadmin only)

**Path Parameters:**
- `company_id` (number, required): Company ID to delete

**Request Body:**
```typescript
ReqModel<CompanyDeleteRequest>

interface CompanyDeleteRequest {
  company_id: number;  // Company ID to delete (auto-filled from path)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "company_id": 3
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
  "message": "Company deleted successfully",
  "res_data": {
    "company_id": 3,
    "deleted": true
  },
  "timestamp": "2024-01-15T13:00:01Z"
}
```

## Notes

- Company names must be globally unique across the system
- Only Superadmins can create and delete companies
- Admins can update their own company's information
- Disabling a company (company_enabled: false) may restrict access for its users
- Deleting a company will cascade to related sites, charge points, and sessions