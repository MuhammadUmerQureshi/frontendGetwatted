/**
 * Sites Group Managers API Types
 * Based on /api/v1/sites-group-managers endpoints
 */

/**
 * Sites Group Manager model (response)
 */
export interface SitesGroupManager {
  id: number;                   // Assignment ID
  site_group_id: number;
  manager_user_id: number;
  assigned_date: string;        // ISO 8601 datetime
  is_active: boolean;           // Whether assignment is active
}

/**
 * Sites Group Manager Create data
 */
export interface SitesGroupManagerCreate {
  site_group_id: number;    // Site group ID (required)
  manager_user_id: number;  // Manager user ID (required)
}

/**
 * Sites Group Manager Create Request
 */
export interface SitesGroupManagerCreateRequest {
  manager_data: SitesGroupManagerCreate;
}

/**
 * Sites Group Manager Update data
 */
export interface SitesGroupManagerUpdate {
  is_active: boolean;   // Whether assignment is active (required)
}

/**
 * Sites Group Manager Update Request
 */
export interface SitesGroupManagerUpdateRequest {
  id: number;           // Assignment ID (auto-filled from path)
  manager_data: SitesGroupManagerUpdate;
}

/**
 * Sites Group Manager Delete Request
 */
export interface SitesGroupManagerDeleteRequest {
  id: number;  // Assignment ID (auto-filled from path)
}