/**
 * RFID Cards API Types
 * Based on /api/v1/rfidcards endpoints
 */

/**
 * RFID Card model (response)
 */
export interface RFIDCard {
  rfid_card_id: number;
  rfid_card_driver_id?: number;
  rfid_card_uid: number;            // Format: yyyymmddhhmmss
  rfid_card_enabled: boolean;
  rfid_card_created: string;        // ISO 8601 datetime
  rfid_card_updated: string;        // ISO 8601 datetime
}

/**
 * RFID Card Create data
 */
export interface RFIDCardCreate {
  rfid_card_driver_id: number;      // Driver ID to associate (required)
  rfid_card_uid?: number;           // Custom UID (format: yyyymmddhhmmss), auto-generated if not provided
  rfid_card_enabled: boolean;       // Default: true
}

/**
 * RFID Card Create Request
 */
export interface RFIDCardCreateRequest {
  rfid_card_data: RFIDCardCreate;
}

/**
 * RFID Card Update data
 */
export interface RFIDCardUpdate {
  rfid_card_driver_id?: number;     // Driver ID to associate
  rfid_card_enabled?: boolean;
}

/**
 * RFID Card Update Request
 */
export interface RFIDCardUpdateRequest {
  rfid_card_id: number;             // RFID card ID to update (auto-filled from path)
  rfid_card_data: RFIDCardUpdate;
}

/**
 * RFID Card Delete Request
 */
export interface RFIDCardDeleteRequest {
  rfid_card_id: number;  // RFID card ID to delete (auto-filled from path)
}