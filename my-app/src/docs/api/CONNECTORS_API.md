# Connectors API

Base Path: `/api/v1/connectors`

## Overview
Manage connectors (charging plugs) for charge points. Each charge point can have multiple connectors. Connectors follow OCPP 1.6 specifications.

## Endpoints

### POST /connectors
Create a new connector for a charge point.

**Authentication Required:** Yes
**Required Permission:** `create.connector` (Superadmin only)

**Request Body:**
```typescript
ReqModel<ConnectorCreateRequest>

interface ConnectorCreateRequest {
  connector_id: number;                     // Connector number: 1, 2, 3, etc. (required)
  connector_cp_id: number;                  // Charge point ID (required)
  connector_type?: string;                  // Connector type (Type2, CCS, CHAdeMO, etc.)
  connector_status: ConnectorStatusType;    // Default: "Available"
  connector_error_code: ConnectorErrorCodeType;  // Default: "NoError"
  connector_enabled: boolean;               // Default: true
  connector_max_volt?: string;              // Max voltage (decimal as string)
  connector_max_amp?: string;               // Max amperage (decimal as string)
}

// OCPP 1.6 Connector Status
type ConnectorStatusType =
  | "Available"
  | "Preparing"
  | "Charging"
  | "SuspendedEVSE"
  | "SuspendedEV"
  | "Finishing"
  | "Reserved"
  | "Unavailable"
  | "Faulted"

// OCPP 1.6 Connector Error Codes
type ConnectorErrorCodeType =
  | "NoError"
  | "ConnectorLockFailure"
  | "EVCommunicationError"
  | "GroundFailure"
  | "HighTemperature"
  | "InternalError"
  | "LocalListConflict"
  | "OtherError"
  | "OverCurrentFailure"
  | "PowerMeterFailure"
  | "PowerSwitchFailure"
  | "ReaderFailure"
  | "ResetFailure"
  | "UnderVoltage"
  | "OverVoltage"
  | "WeakSignal"
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "connector_id": 1,
    "connector_cp_id": 5,
    "connector_type": "Type2",
    "connector_status": "Available",
    "connector_error_code": "NoError",
    "connector_enabled": true,
    "connector_max_volt": "240",
    "connector_max_amp": "32"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<Connector>

interface Connector {
  connector_id: number;
  connector_cp_id: number;
  connector_type?: string;
  connector_status?: string;
  connector_error_code?: string;
  connector_enabled: boolean;
  connector_max_volt?: string;
  connector_max_amp?: string;
  connector_created: string;          // ISO 8601 datetime
  connector_updated: string;          // ISO 8601 datetime
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Connector created successfully",
  "res_data": {
    "connector_id": 1,
    "connector_cp_id": 5,
    "connector_type": "Type2",
    "connector_status": "Available",
    "connector_error_code": "NoError",
    "connector_enabled": true,
    "connector_max_volt": "240",
    "connector_max_amp": "32",
    "connector_created": "2024-01-15T10:30:01Z",
    "connector_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### GET /connectors/chargepoint/{cp_id}
Get all connectors for a specific charge point.

**Authentication Required:** Yes
**Required Permission:** `read.connector`

**Company Policy:** Can only view connectors for charge points in your company.

**Path Parameters:**
- `cp_id` (number, required): Charge point ID

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<Connector[]>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Connectors retrieved successfully",
  "res_data": [
    {
      "connector_id": 1,
      "connector_cp_id": 5,
      "connector_type": "Type2",
      "connector_status": "Charging",
      "connector_error_code": "NoError",
      "connector_enabled": true,
      "connector_max_volt": "240",
      "connector_max_amp": "32",
      "connector_created": "2024-01-15T10:30:01Z",
      "connector_updated": "2024-01-15T11:45:00Z"
    },
    {
      "connector_id": 2,
      "connector_cp_id": 5,
      "connector_type": "CCS",
      "connector_status": "Available",
      "connector_error_code": "NoError",
      "connector_enabled": true,
      "connector_max_volt": "400",
      "connector_max_amp": "125",
      "connector_created": "2024-01-15T10:30:01Z",
      "connector_updated": "2024-01-15T10:30:01Z"
    }
  ],
  "timestamp": "2024-01-15T12:00:00Z"
}
```

---

### PUT /connectors/{connector_id}
Update a connector's specifications or status.

**Authentication Required:** Yes
**Required Permission:** `update.connector` (Superadmin only)

**Company Policy:** Can only update connectors for charge points in your company.

**Path Parameters:**
- `connector_id` (number, required): Connector ID to update

**Request Body:**
```typescript
ReqModel<ConnectorUpdateRequest>

interface ConnectorUpdateRequest {
  connector_cp_id: number;                  // Charge point ID (required for composite key)
  connector_type?: string;
  connector_status?: ConnectorStatusType;
  connector_error_code?: ConnectorErrorCodeType;
  connector_enabled?: boolean;
  connector_max_volt?: string;
  connector_max_amp?: string;
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "connector_cp_id": 5,
    "connector_status": "Unavailable"
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<Connector>
```

---

### DELETE /connectors/{connector_id}
Delete a connector from database.

**Authentication Required:** Yes
**Required Permission:** `delete.connector` (Superadmin only)

**Company Policy:** Can only delete connectors for charge points in your company.

**Path Parameters:**
- `connector_id` (number, required): Connector ID to delete

**Request Body:**
```typescript
ReqModel<ConnectorDeleteRequest>

interface ConnectorDeleteRequest {
  connector_cp_id: number;  // Charge point ID (required for composite key)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "connector_cp_id": 5
  },
  "timestamp": "2024-01-15T13:00:00Z"
}
```

**Response:**
```typescript
ResModel<{}>
```

## Notes

- Connectors use a composite key: (connector_id, connector_cp_id)
- connector_id is the connector number (1, 2, 3, etc.) within a charge point
- Connector status and error codes follow OCPP 1.6 specification
- Status is updated automatically via OCPP StatusNotification messages
- Common connector types: Type1, Type2, CCS, CHAdeMO, GB/T
- Voltage and amperage stored as decimal strings for precision
- Company filtering automatically applies through charge point ownership