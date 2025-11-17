# Drivers API

Base Path: `/api/v1/drivers`

## Overview
Manage drivers (EV users who charge at stations). Drivers can be associated with RFID cards for authentication.

## Endpoints

### POST /drivers
Create a new driver.

**Authentication Required:** Yes
**Required Permission:** `create.driver` (Admin + Superadmin)

**Request Body:**
```typescript
ReqModel<DriverCreateRequest>

interface DriverCreateRequest {
  driver_data: DriverCreate;
}

interface DriverCreate {
  driver_company_id: number;          // Company ID (required)
  driver_enabled: boolean;            // Default: true
  driver_full_name: string;           // Max 255 characters (required)
  driver_email?: string;              // Max 255 characters
  driver_phone?: string;              // Max 50 characters
  driver_group_id?: number;           // Driver group ID
  driver_action_alerts: boolean;      // Default: true
  driver_payment_alerts: boolean;     // Default: true
  driver_system_alerts: boolean;      // Default: true
  driver_user_id?: number;            // Associated user ID
}
```

**Response:**
```typescript
ResModel<Driver>

interface Driver {
  driver_id: number;
  driver_company_id: number;
  driver_enabled: boolean;
  driver_full_name: string;
  driver_email?: string;
  driver_phone?: string;
  driver_group_id?: number;
  driver_action_alerts: boolean;
  driver_payment_alerts: boolean;
  driver_system_alerts: boolean;
  driver_user_id?: number;
  driver_created: string;             // ISO 8601 datetime
  driver_updated: string;             // ISO 8601 datetime
}
```

### GET /drivers
Get all drivers.

**Authentication Required:** Yes
**Required Permission:** `read.driver`

**Company Filtering:** Admin only sees drivers from their company.

### GET /drivers/{driver_id}
Get a specific driver by ID.

**Path Parameters:**
- `driver_id` (number, required)

### PUT /drivers/{driver_id}
Update a driver (admin-only fields).

**Authentication Required:** Yes
**Required Permission:** `update.driver` (Admin + Superadmin)

**Request Body:**
```typescript
ReqModel<DriverUpdateRequest>

interface DriverUpdateRequest {
  driver_id: number;                  // Auto-filled from path
  driver_data: DriverUpdate;
}

interface DriverUpdate {
  driver_enabled?: boolean;
  driver_group_id?: number;
  driver_action_alerts?: boolean;
  driver_payment_alerts?: boolean;
  driver_system_alerts?: boolean;
  driver_user_id?: number;
  // Note: driver_full_name, driver_email, driver_phone sync from User table
}
```

### DELETE /drivers/{driver_id}
Delete a driver.

**Authentication Required:** Yes
**Required Permission:** `delete.driver` (Admin + Superadmin)

## Notes

- Driver information (name, email, phone) syncs from the User table if driver_user_id is set
- Drivers can be assigned to driver groups for tariff application
- Alert preferences control notification delivery
- RFID cards are assigned to drivers via the RFID Cards API
- Company filtering automatically applies