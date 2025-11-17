/**
 * ChargePoints API Types
 * Based on /api/v1/chargepoints endpoints
 */

/**
 * ChargePoint model (response)
 */
export interface ChargePoint {
  cp_id: number;
  cp_company_id: number;
  cp_site_id: number;
  cp_name: string;

  // OCPP 1.6 BootNotification Fields
  cp_vendor?: string;
  cp_model?: string;
  cp_serial_number?: string;
  cp_firmware_version?: string;
  cp_iccid?: string;
  cp_imsi?: string;
  cp_meter_type?: string;
  cp_meter_serial_number?: string;

  // Charger Basic Info
  cp_type?: string;
  cp_longitude?: string;
  cp_latitude?: string;
  cp_pincode?: string;
  cp_ws_url?: string;
  cp_photo?: string;

  // Status and Configuration
  cp_status?: string;
  cp_is_online: boolean;
  cp_enabled: boolean;
  cp_access_type?: string;
  cp_always_available: boolean;

  // Operating Hours (time in HH:MM:SS format)
  cp_mon_from?: string;
  cp_mon_to?: string;
  cp_tue_from?: string;
  cp_tue_to?: string;
  cp_wed_from?: string;
  cp_wed_to?: string;
  cp_thu_from?: string;
  cp_thu_to?: string;
  cp_fri_from?: string;
  cp_fri_to?: string;
  cp_sat_from?: string;
  cp_sat_to?: string;
  cp_sun_from?: string;
  cp_sun_to?: string;

  // Timestamps
  cp_last_conn?: string;              // ISO 8601 datetime
  cp_last_disconn?: string;           // ISO 8601 datetime
  cp_last_heartbeat?: string;         // ISO 8601 datetime
  cp_created: string;                 // ISO 8601 datetime
  cp_updated: string;                 // ISO 8601 datetime
}

/**
 * ChargePoint Create data
 */
export interface ChargePointCreate {
  cp_company_id: number;              // Company ID (required)
  cp_site_id: number;                 // Site ID (required)
  cp_name: string;                    // Max 255 characters (required)

  // OCPP 1.6 BootNotification Fields
  cp_vendor?: string;                 // Max 20 characters
  cp_model?: string;                  // Max 20 characters
  cp_serial_number?: string;          // Max 25 characters
  cp_firmware_version?: string;       // Max 50 characters
  cp_iccid?: string;                  // Max 20 characters
  cp_imsi?: string;                   // Max 20 characters
  cp_meter_type?: string;             // Max 25 characters
  cp_meter_serial_number?: string;    // Max 25 characters

  // Charger Basic Info
  cp_type?: string;                   // Max 50 characters
  cp_longitude?: string;              // Decimal as string
  cp_latitude?: string;               // Decimal as string
  cp_pincode?: string;                // Max 20 characters
  cp_ws_url?: string;                 // Max 255 characters
  cp_photo?: string;                  // Max 255 characters

  // Status and Configuration
  cp_status?: string;                 // Max 50 characters (Healthy, Faulty, etc.)
  cp_is_online: boolean;              // Default: false
  cp_enabled: boolean;                // Default: true
  cp_access_type?: string;            // Max 50 characters (public, private)
  cp_always_available: boolean;       // Default: false

  // Operating Hours (time in HH:MM:SS format)
  cp_mon_from?: string;
  cp_mon_to?: string;
  cp_tue_from?: string;
  cp_tue_to?: string;
  cp_wed_from?: string;
  cp_wed_to?: string;
  cp_thu_from?: string;
  cp_thu_to?: string;
  cp_fri_from?: string;
  cp_fri_to?: string;
  cp_sat_from?: string;
  cp_sat_to?: string;
  cp_sun_from?: string;
  cp_sun_to?: string;
}

/**
 * ChargePoint Create Request
 */
export interface ChargePointCreateRequest {
  cp_data: ChargePointCreate;
}

/**
 * ChargePoint Update data (all fields optional)
 */
export interface ChargePointUpdate {
  cp_name?: string;
  cp_vendor?: string;
  cp_model?: string;
  cp_serial_number?: string;
  cp_firmware_version?: string;
  cp_iccid?: string;
  cp_imsi?: string;
  cp_meter_type?: string;
  cp_meter_serial_number?: string;
  cp_type?: string;
  cp_longitude?: string;
  cp_latitude?: string;
  cp_pincode?: string;
  cp_ws_url?: string;
  cp_photo?: string;
  cp_status?: string;
  cp_is_online?: boolean;
  cp_enabled?: boolean;
  cp_access_type?: string;
  cp_always_available?: boolean;
  cp_mon_from?: string;
  cp_mon_to?: string;
  cp_tue_from?: string;
  cp_tue_to?: string;
  cp_wed_from?: string;
  cp_wed_to?: string;
  cp_thu_from?: string;
  cp_thu_to?: string;
  cp_fri_from?: string;
  cp_fri_to?: string;
  cp_sat_from?: string;
  cp_sat_to?: string;
  cp_sun_from?: string;
  cp_sun_to?: string;
}

/**
 * ChargePoint Update Request
 */
export interface ChargePointUpdateRequest {
  cp_id: number;                      // ChargePoint ID to update (auto-filled from path)
  cp_data: ChargePointUpdate;
}

/**
 * ChargePoint Delete Request
 */
export interface ChargePointDeleteRequest {
  cp_id: number;  // ChargePoint ID to delete (auto-filled from path)
}