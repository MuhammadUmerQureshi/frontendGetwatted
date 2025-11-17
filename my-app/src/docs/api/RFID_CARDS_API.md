# RFID Cards API

Base Path: `/api/v1/rfidcards`

## Overview
Manage RFID cards for driver authentication at charge points. Each card is associated with a driver.

## Endpoints

### POST /rfidcards
Create a new RFID card.

**Authentication Required:** Yes
**Required Permission:** `create.rfidcard` (Superadmin only)

**Request Body:**
```typescript
ReqModel<RFIDCardCreateRequest>

interface RFIDCardCreateRequest {
  rfid_card_driver_id: number;      // Driver ID to associate (required)
  rfid_card_uid?: number;           // Custom UID (format: yyyymmddhhmmss), auto-generated if not provided
  rfid_card_enabled: boolean;       // Default: true
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "rfid_card_driver_id": 10,
    "rfid_card_enabled": true
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```typescript
ResModel<RFIDCard>

interface RFIDCard {
  rfid_card_id: number;
  rfid_card_driver_id?: number;
  rfid_card_uid: number;            // Format: yyyymmddhhmmss
  rfid_card_enabled: boolean;
  rfid_card_created: string;        // ISO 8601 datetime
  rfid_card_updated: string;        // ISO 8601 datetime
}
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "RFID card created successfully",
  "res_data": {
    "rfid_card_id": 25,
    "rfid_card_driver_id": 10,
    "rfid_card_uid": 20240115103001,
    "rfid_card_enabled": true,
    "rfid_card_created": "2024-01-15T10:30:01Z",
    "rfid_card_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T10:30:01Z"
}
```

---

### GET /rfidcards
Get all RFID cards.

**Authentication Required:** Yes
**Required Permission:** `read.rfidcard`

**Company Filtering:** Admin only sees RFID cards for drivers in their company.

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<RFIDCard[]>
```

---

### GET /rfidcards/{rfid_card_id}
Get a specific RFID card by ID.

**Authentication Required:** Yes
**Required Permission:** `read.rfidcard`

**Path Parameters:**
- `rfid_card_id` (number, required): RFID card ID to retrieve

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<RFIDCard>
```

---

### GET /rfidcards/driver/{driver_id}
Get RFID card by driver ID.

**Authentication Required:** Yes
**Required Permission:** `read.rfidcard`

**Path Parameters:**
- `driver_id` (number, required): Driver ID to look up

**Request Body:** None (GET request)

**Response:**
```typescript
ResModel<RFIDCard>
```

**Success Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": true,
  "message": "RFID card retrieved successfully",
  "res_data": {
    "rfid_card_id": 25,
    "rfid_card_driver_id": 10,
    "rfid_card_uid": 20240115103001,
    "rfid_card_enabled": true,
    "rfid_card_created": "2024-01-15T10:30:01Z",
    "rfid_card_updated": "2024-01-15T10:30:01Z"
  },
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

### PUT /rfidcards/{rfid_card_id}
Update an RFID card.

**Authentication Required:** Yes
**Required Permission:** `update.rfidcard` (Superadmin only)

**Path Parameters:**
- `rfid_card_id` (number, required): RFID card ID to update

**Request Body:**
```typescript
ReqModel<RFIDCardUpdateRequest>

interface RFIDCardUpdateRequest {
  rfid_card_driver_id?: number;     // Driver ID to associate
  rfid_card_enabled?: boolean;
}
```

**Request Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "req_data": {
    "rfid_card_enabled": false
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

**Response:**
```typescript
ResModel<RFIDCard>
```

---

### DELETE /rfidcards/{rfid_card_id}
Delete an RFID card.

**Authentication Required:** Yes
**Required Permission:** `delete.rfidcard` (Superadmin only)

**Path Parameters:**
- `rfid_card_id` (number, required): RFID card ID to delete

**Request Body:**
```typescript
ReqModel<RFIDCardDeleteRequest>

interface RFIDCardDeleteRequest {
  rfid_card_id: number;  // Auto-filled from path
}
```

**Response:**
```typescript
ResModel<{}>
```

## Notes

- RFID cards are used for driver authentication at charge points
- UID format is yyyymmddhhmmss (e.g., 20240115103001)
- If UID is not provided during creation, it's auto-generated based on timestamp
- Each card is associated with a driver
- Cards can be enabled/disabled without deletion
- Admin can only create cards for drivers in their company
- Company filtering automatically applies for non-Superadmin users