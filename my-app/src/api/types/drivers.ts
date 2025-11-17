/**
 * Drivers API Types
 * Based on /api/v1/drivers endpoints
 */

/**
 * Driver model (response)
 */
export interface Driver {
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

/**
 * Driver Create data
 */
export interface DriverCreate {
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

/**
 * Driver Create Request
 */
export interface DriverCreateRequest {
  driver_data: DriverCreate;
}

/**
 * Driver Update data
 */
export interface DriverUpdate {
  driver_enabled?: boolean;
  driver_group_id?: number;
  driver_action_alerts?: boolean;
  driver_payment_alerts?: boolean;
  driver_system_alerts?: boolean;
  driver_user_id?: number;
  // Note: driver_full_name, driver_email, driver_phone sync from User table
}

/**
 * Driver Update Request
 */
export interface DriverUpdateRequest {
  driver_id: number;                  // Driver ID to update (auto-filled from path)
  driver_data: DriverUpdate;
}

/**
 * Driver Delete Request
 */
export interface DriverDeleteRequest {
  driver_id: number;  // Driver ID to delete (auto-filled from path)
}