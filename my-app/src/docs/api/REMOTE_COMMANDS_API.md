# Remote Commands API

Base Path: `/api/v1/remote_commands`

## Overview
Send OCPP remote commands to charge points. Supports RemoteStartTransaction, RemoteStopTransaction, and Reset commands.

## Endpoints

### POST /remote_commands/{cp_id}/remote_start
Send RemoteStartTransaction command to a charger.

**Authentication Required:** Yes
**Required Permission:** `ocpp.remote.start`

**Company Policy:** User can only control chargers in their company.

**Path Parameters:**
- `cp_id` (number, required): ChargePoint ID

**Request Body:**
```typescript
ReqModel<RemoteStartTransactionRequest>

interface RemoteStartTransactionRequest {
  id_tag: string;         // RFID card UID or authorization identifier, max 20 characters (required)
  connector_id: number;   // Specific connector ID to start transaction on, must be > 0 (required)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "id_tag": "20240115103001",
    "connector_id": 1
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<RemoteStartResponse>

interface RemoteStartResponse {
  status: {
    status: "Accepted" | "Rejected";        // OCPP protocol response
  };
  cp_id: number;
  cp_name: string;
  connector_id: number;
  id_tag: string;
  message?: string;                         // Additional message or error details
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Remote start command sent successfully",
  "res_data": {
    "status": {
      "status": "Accepted"
    },
    "cp_id": 5,
    "cp_name": "CP-DOWNTOWN-001",
    "connector_id": 1,
    "id_tag": "20240115103001",
    "message": "Charger accepted remote start command"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

**Rejected Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Remote start command sent",
  "res_data": {
    "status": {
      "status": "Rejected"
    },
    "cp_id": 5,
    "cp_name": "CP-DOWNTOWN-001",
    "connector_id": 1,
    "id_tag": "20240115103001",
    "message": "Charger rejected remote start - connector occupied"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### POST /remote_commands/{cp_id}/remote_stop
Send RemoteStopTransaction command to a charger.

**Authentication Required:** Yes
**Required Permission:** `ocpp.remote.stop`

**Company Policy:** User can only control chargers in their company.

**Path Parameters:**
- `cp_id` (number, required): ChargePoint ID

**Request Body:**
```typescript
ReqModel<RemoteStopTransactionRequest>

interface RemoteStopTransactionRequest {
  transaction_id: number;  // Transaction ID (charge_session_id) to stop, must be > 0 (required)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "transaction_id": 123
  },
  "timestamp": "2024-01-15T11:00:00Z"
}
```

**Response:**
```typescript
ResModel<RemoteStopResponse>

interface RemoteStopResponse {
  status: {
    status: "Accepted" | "Rejected";        // OCPP protocol response
  };
  cp_id: number;
  cp_name: string;
  transaction_id: number;
  message?: string;                         // Additional message or error details
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Remote stop command sent successfully",
  "res_data": {
    "status": {
      "status": "Accepted"
    },
    "cp_id": 5,
    "cp_name": "CP-DOWNTOWN-001",
    "transaction_id": 123,
    "message": "Charger accepted remote stop command"
  },
  "timestamp": "2024-01-15T11:00:01Z"
}
```

---

### POST /remote_commands/{cp_id}/reset
Send Reset command to a charger (Soft or Hard reset).

**Authentication Required:** Yes
**Required Permission:** `ocpp.reset`

**Company Policy:** User can only reset chargers in their company.

**Path Parameters:**
- `cp_id` (number, required): ChargePoint ID

**Request Body:**
```typescript
ReqModel<ResetChargerRequest>

interface ResetChargerRequest {
  reset_type: "Soft" | "Hard";  // Reset type, default: "Soft" (required)
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "reset_type": "Soft"
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<ChargerResetResponse>

interface ChargerResetResponse {
  status: {
    status: "Accepted" | "Rejected";        // OCPP protocol response
  };
  cp_id: number;
  cp_name: string;
  reset_type: string;
  message?: string;                         // Additional message or error details
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "Reset command sent successfully",
  "res_data": {
    "status": {
      "status": "Accepted"
    },
    "cp_id": 5,
    "cp_name": "CP-DOWNTOWN-001",
    "reset_type": "Soft",
    "message": "Charger accepted reset command"
  },
  "timestamp": "2024-01-15T12:00:01Z"
}
```

---

### GET /remote_commands/connections
Get list of all active WebSocket connections.

**Authentication Required:** Yes
**Required Permission:** `read.chargepoint`

**Request Body:** None (GET request)

**Response:**
```json
{
  "status": true,
  "message": "Found 5 active connection(s)",
  "res_data": {
    "connected_chargers": ["CP-DOWNTOWN-001", "CP-DOWNTOWN-002", "CP-MALL-005", "CP-AIRPORT-010", "CP-HIGHWAY-020"],
    "connection_count": 5
  }
}
```

**Note:** This endpoint does not use the standard ReqModel/ResModel wrapper.

## Reset Types

- **Soft**: Graceful restart (equivalent to software reboot)
  - Stops ongoing transactions
  - Clears cache
  - Restarts system services

- **Hard**: Force restart (equivalent to power cycle)
  - Immediately terminates all operations
  - Cuts power and restarts
  - Use with caution

## Command Status Responses (OCPP 1.6)

- **Accepted**: Charger accepted and will execute the command
- **Rejected**: Charger rejected the command (may be busy, in error state, or command invalid)

## Error Handling

If the charger is offline or not connected via WebSocket, the API will return an error:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": false,
  "message": "Charger is not connected",
  "res_data": null,
  "timestamp": "2024-01-15T10:30:01Z",
  "error_code": "CHARGER_OFFLINE"
}
```

## Notes

- All remote commands require active WebSocket connection to the charge point
- Commands are sent via OCPP 1.6 protocol
- Response indicates if charger accepted command, not if it completed successfully
- id_tag should match rfid_card_uid for proper driver authorization
- transaction_id corresponds to charge_session_id in the database
- Remote start will fail if connector is already in use
- Remote stop will fail if transaction_id doesn't exist or already stopped
- Company filtering automatically applies - users can only control their company's chargers
- Check /remote_commands/connections to see which chargers are online before sending commands