/**
 * Sites Groups API Types
 * Based on /api/v1/sites-groups endpoints
 */

/**
 * Sites Group model (response)
 */
export interface SitesGroup {
  site_group_id: number;
  site_company_id: number;
  site_group_name: string;
  site_group_enabled: boolean;
  site_group_created: string;     // ISO 8601 datetime
  site_group_updated: string;     // ISO 8601 datetime
}

/**
 * Sites Group Create data
 */
export interface SitesGroupCreate {
  site_company_id: number;        // Company ID (required)
  site_group_name: string;        // Max 255 characters (required)
  site_group_enabled: boolean;    // Default: true
}

/**
 * Sites Group Create Request
 */
export interface SitesGroupCreateRequest {
  site_group_data: SitesGroupCreate;
}

/**
 * Sites Group Update data
 */
export interface SitesGroupUpdate {
  site_group_name?: string;       // Max 255 characters
  site_group_enabled?: boolean;
}

/**
 * Sites Group Update Request
 */
export interface SitesGroupUpdateRequest {
  site_group_id: number;          // Site group ID to update (auto-filled from path)
  site_group_data: SitesGroupUpdate;
}

/**
 * Sites Group Delete Request
 */
export interface SitesGroupDeleteRequest {
  site_group_id: number;  // Site group ID to delete (auto-filled from path)
}