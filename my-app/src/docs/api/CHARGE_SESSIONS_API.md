# Charge Sessions API

Base Path: `/api/v1/chargesessions`

## Overview
Manage charging sessions (transactions). Sessions track energy consumption, duration, cost, and payment status.

## Endpoints

### POST /chargesessions
Create a new charge session (StartTransaction).

**Authentication Required:** Yes
**Required Permission:** `create.chargesession`

**Request Body:**
```typescript
ReqModel<ChargeSessionCreateRequest>

interface ChargeSessionCreateRequest {
  charge_session_connector_id: number;        // Connector ID (required)
  charge_session_cp_id: number;               // Charge point ID (required)
  charge_session_driver_id?: number;          // Driver ID
  charge_session_rfid_card_id?: number;       // RFID card ID used
  charge_session_tariff_id?: number;          // Tariff ID for pricing
  charge_session_start_time: string;          // ISO 8601 datetime (required)
  charge_session_meter_start: number;         // Meter value at start in Wh, default: 0
}
```

**Response:**
```typescript
ResModel<ChargeSession>

interface ChargeSession {
  charge_session_id: number;
  charge_session_connector_id: number;
  charge_session_cp_id: number;
  charge_session_driver_id?: number;
  charge_session_rfid_card_id?: number;
  charge_session_tariff_id?: number;
  charge_session_start_time?: string;         // ISO 8601 datetime
  charge_session_end_time?: string;           // ISO 8601 datetime
  charge_session_duration?: number;           // Duration in seconds
  charge_session_stop_reason?: string;
  charge_session_status: string;              // "In Progress", "Completed", "Cancelled", "Failed"
  charge_session_meter_start?: number;        // Wh
  charge_session_meter_stop?: number;         // Wh
  charge_session_energy_kwh?: string;         // kWh (decimal as string)
  charge_session_cost?: string;               // Cost (decimal as string)
  charge_session_payment_status: string;      // "Pending", "Paid", "Failed", "Refunded"
  charge_session_created: string;             // ISO 8601 datetime
}
```

---

### GET /chargesessions
Get all charge sessions.

**Authentication Required:** Yes
**Required Permission:** `read.chargesession`

**Company Filtering:** Admin only sees sessions from company charge points.

**Response:**
```typescript
ResModel<ChargeSession[]>
```

---

### GET /chargesessions/{session_id}
Get a specific charge session by ID.

**Authentication Required:** Yes
**Required Permission:** `read.chargesession`

**Path Parameters:**
- `session_id` (number, required)

**Response:**
```typescript
ResModel<ChargeSession>
```

---

### GET /chargesessions/driver/{driver_id}
Get all charge sessions for a specific driver.

**Authentication Required:** Yes
**Required Permission:** `read.chargesession`

**Path Parameters:**
- `driver_id` (number, required)

**Response:**
```typescript
ResModel<ChargeSession[]>
```

---

### GET /chargesessions/chargepoint/{cp_id}
Get all charge sessions for a specific charge point.

**Authentication Required:** Yes
**Required Permission:** `read.chargesession`

**Path Parameters:**
- `cp_id` (number, required)

**Response:**
```typescript
ResModel<ChargeSession[]>
```

---

### PUT /chargesessions/{session_id}/energy
Update session energy consumption (MeterValues).

**Authentication Required:** Yes
**Required Permission:** `update.chargesession`

**Path Parameters:**
- `session_id` (number, required)

**Request Body:**
```typescript
ReqModel<ChargeSessionUpdateEnergyRequest>

interface ChargeSessionUpdateEnergyRequest {
  charge_session_energy_kwh: string;  // Energy in kWh (decimal as string, required)
}
```

**Response:**
```typescript
ResModel<ChargeSession>
```

---

### PUT /chargesessions/{session_id}/stop
Stop and complete charge session (StopTransaction).

**Authentication Required:** Yes
**Required Permission:** `update.chargesession`

**Path Parameters:**
- `session_id` (number, required)

**Request Body:**
```typescript
ReqModel<ChargeSessionStopRequest>

interface ChargeSessionStopRequest {
  charge_session_end_time: string;            // ISO 8601 datetime (required)
  charge_session_meter_stop: number;          // Meter value at stop in Wh (required)
  charge_session_energy_kwh: string;          // Final energy in kWh (required)
  charge_session_stop_reason?: StopReasonType;
}

type StopReasonType =
  | "Local"
  | "Remote"
  | "EmergencyStop"
  | "EVDisconnected"
  | "HardReset"
  | "SoftReset"
  | "PowerLoss"
  | "Reboot"
  | "Other"
```

**Response:**
```typescript
ResModel<ChargeSession>
```

**Note:** Duration and cost are auto-calculated by the service.

---

### PUT /chargesessions/{session_id}/payment-status
Update payment status.

**Authentication Required:** Yes
**Required Permission:** `update.chargesession`

**Path Parameters:**
- `session_id` (number, required)

**Request Body:**
```typescript
ReqModel<ChargeSessionUpdatePaymentStatusRequest>

interface ChargeSessionUpdatePaymentStatusRequest {
  charge_session_payment_status: PaymentStatusType;  // Required
}

type PaymentStatusType = "Pending" | "Paid" | "Failed" | "Refunded"
```

**Response:**
```typescript
ResModel<ChargeSession>
```

---

### DELETE /chargesessions/{session_id}
Delete a charge session (Superadmin only).

**Authentication Required:** Yes
**Required Permission:** `delete.chargesession` (Superadmin only)

**Path Parameters:**
- `session_id` (number, required)

**Request Body:**
```typescript
ReqModel<ChargeSessionDeleteRequest>

interface ChargeSessionDeleteRequest {
  charge_session_id: number;  // Auto-filled from path
}
```

**Response:**
```typescript
ResModel<{}>
```

## Session Status Values

- **In Progress**: Session is currently active
- **Completed**: Session finished normally
- **Cancelled**: Session was cancelled
- **Failed**: Session ended due to error

## Payment Status Values

- **Pending**: Payment not yet processed
- **Paid**: Payment completed successfully
- **Failed**: Payment processing failed
- **Refunded**: Payment was refunded

## Stop Reasons (OCPP 1.6)

- **Local**: Stopped locally at charge point
- **Remote**: Stopped via remote command
- **EmergencyStop**: Emergency stop activated
- **EVDisconnected**: EV disconnected
- **HardReset**: Charge point hard reset
- **SoftReset**: Charge point soft reset
- **PowerLoss**: Power loss occurred
- **Reboot**: System reboot
- **Other**: Other reason

## Notes

- Sessions are created when StartTransaction OCPP message is received
- Energy values updated via MeterValues OCPP messages
- Duration and cost auto-calculated when session stops
- Meter values in Wh (watt-hours), energy in kWh (kilowatt-hours)
- Company filtering automatically applies