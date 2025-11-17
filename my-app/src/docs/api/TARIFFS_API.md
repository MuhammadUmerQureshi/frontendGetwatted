# Tariffs API

Base Path: `/api/v1/tariffs`

## Overview
Manage pricing tariffs for charging sessions. Tariffs define day/night rates, fixed fees, and idle charging fees.

## Endpoints

### POST /tariffs
Create a new tariff.

**Authentication Required:** Yes
**Required Permission:** `create.tariff` (Admin + Superadmin)

**Request Body:**
```typescript
ReqModel<TariffCreateRequest>

interface TariffCreateRequest {
  tariffs_company_id: number;              // Company ID (required)
  tariffs_name: string;                    // Max 255 characters (required)
  tariffs_enabled: boolean;                // Default: true
  tariffs_type?: string;                   // Max 50 characters
  tariffs_per?: string;                    // Max 50 characters (e.g., "kWh", "minute")
  tariffs_rate_daytime?: string;           // Decimal as string
  tariffs_rate_nighttime?: string;         // Decimal as string
  tariffs_daytime_from?: string;           // Time in HH:MM:SS format
  tariffs_daytime_to?: string;             // Time in HH:MM:SS format
  tariffs_nighttime_from?: string;         // Time in HH:MM:SS format
  tariffs_nighttime_to?: string;           // Time in HH:MM:SS format
  tariffs_fixed_start_fee?: string;        // Decimal as string
  tariffs_idle_charging_fee?: string;      // Decimal as string
  tariffs_idle_apply_after?: number;       // Minutes before idle fee applies
}
```

**Response:**
```typescript
ResModel<Tariff>

interface Tariff {
  tariffs_id: number;
  tariffs_company_id: number;
  tariffs_name: string;
  tariffs_enabled: boolean;
  tariffs_type?: string;
  tariffs_per?: string;
  tariffs_rate_daytime?: string;
  tariffs_rate_nighttime?: string;
  tariffs_daytime_from?: string;
  tariffs_daytime_to?: string;
  tariffs_nighttime_from?: string;
  tariffs_nighttime_to?: string;
  tariffs_fixed_start_fee?: string;
  tariffs_idle_charging_fee?: string;
  tariffs_idle_apply_after?: number;
  tariffs_created: string;                  // ISO 8601 datetime
  tariffs_updated: string;                  // ISO 8601 datetime
}
```

### GET /tariffs
Get all tariffs.

**Authentication Required:** Yes
**Required Permission:** `read.tariff`

**Company Filtering:** Admin only sees tariffs from their company.

### GET /tariffs/{tariffs_id}
Get a specific tariff by ID.

**Path Parameters:**
- `tariffs_id` (number, required)

### PUT /tariffs/{tariffs_id}
Update a tariff.

**Authentication Required:** Yes
**Required Permission:** `update.tariff` (Admin + Superadmin)

### DELETE /tariffs/{tariffs_id}
Delete a tariff.

**Authentication Required:** Yes
**Required Permission:** `delete.tariff` (Admin + Superadmin)

## Notes

- Tariffs define pricing for charging sessions
- Supports day/night rate differentiation
- Decimal values stored as strings for precision
- Time values in HH:MM:SS format (e.g., "09:00:00")
- Company filtering automatically applies