# Drivers Group API

Base Path: `/api/v1/drivers-groups`

## Overview
Manage driver groups. Driver groups organize drivers and assign them tariffs for billing purposes.

## Endpoints

### POST /drivers-groups
Create a new drivers group.

**Authentication Required:** Yes
**Required Permission:** `create.driversgroup` (Admin + Superadmin)

**Request Body:**
```typescript
ReqModel<DriversGroupCreateRequest>

interface DriversGroupCreateRequest {
  drivers_group_data: DriversGroupCreate;
}

interface DriversGroupCreate {
  drivers_group_company_id: number;     // Company ID (required)
  drivers_group_name: string;           // Max 255 characters (required)
  drivers_group_enabled: boolean;       // Default: true
  driver_tariff_id: number;             // Tariff ID for this group (required)
}
```

**Response:**
```typescript
ResModel<DriversGroup>

interface DriversGroup {
  drivers_group_id: number;
  drivers_group_company_id: number;
  drivers_group_name: string;
  drivers_group_enabled: boolean;
  driver_tariff_id: number;
  drivers_group_created: string;        // ISO 8601 datetime
  drivers_group_updated: string;        // ISO 8601 datetime
}
```

### GET /drivers-groups
Get all drivers groups.

**Authentication Required:** Yes
**Required Permission:** `read.driversgroup`

**Company Filtering:** Admin only sees drivers groups from their company.

### GET /drivers-groups/{drivers_group_id}
Get a specific drivers group by ID.

**Path Parameters:**
- `drivers_group_id` (number, required)

### PUT /drivers-groups/{drivers_group_id}
Update a drivers group.

**Authentication Required:** Yes
**Required Permission:** `update.driversgroup` (Admin + Superadmin)

**Request Body:**
```typescript
ReqModel<DriversGroupUpdateRequest>

interface DriversGroupUpdateRequest {
  drivers_group_id: number;             // Auto-filled from path
  drivers_group_data: DriversGroupUpdate;
}

interface DriversGroupUpdate {
  drivers_group_name?: string;
  drivers_group_enabled?: boolean;
  driver_tariff_id?: number;
}
```

### DELETE /drivers-groups/{drivers_group_id}
Delete a drivers group.

**Authentication Required:** Yes
**Required Permission:** `delete.driversgroup` (Admin + Superadmin)

## Notes

- Driver groups associate drivers with specific tariffs
- Used for organizing drivers and applying group-based pricing
- Company filtering automatically applies