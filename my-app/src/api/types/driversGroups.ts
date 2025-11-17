/**
 * Drivers Groups API Types
 * Based on /api/v1/drivers-groups endpoints
 */

/**
 * Drivers Group model (response)
 */
export interface DriversGroup {
  drivers_group_id: number;
  drivers_group_company_id: number;
  drivers_group_name: string;
  drivers_group_enabled: boolean;
  driver_tariff_id: number;
  drivers_group_created: string;        // ISO 8601 datetime
  drivers_group_updated: string;        // ISO 8601 datetime
}

/**
 * Drivers Group Create data
 */
export interface DriversGroupCreate {
  drivers_group_company_id: number;     // Company ID (required)
  drivers_group_name: string;           // Max 255 characters (required)
  drivers_group_enabled: boolean;       // Default: true
  driver_tariff_id: number;             // Tariff ID for this group (required)
}

/**
 * Drivers Group Create Request
 */
export interface DriversGroupCreateRequest {
  drivers_group_data: DriversGroupCreate;
}

/**
 * Drivers Group Update data
 */
export interface DriversGroupUpdate {
  drivers_group_name?: string;
  drivers_group_enabled?: boolean;
  driver_tariff_id?: number;
}

/**
 * Drivers Group Update Request
 */
export interface DriversGroupUpdateRequest {
  drivers_group_id: number;             // Drivers group ID to update (auto-filled from path)
  drivers_group_data: DriversGroupUpdate;
}

/**
 * Drivers Group Delete Request
 */
export interface DriversGroupDeleteRequest {
  drivers_group_id: number;  // Drivers group ID to delete (auto-filled from path)
}