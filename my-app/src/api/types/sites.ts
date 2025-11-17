/**
 * Sites API Types
 * Based on /api/v1/sites endpoints
 */

/**
 * Site model (response)
 */
export interface Site {
  site_id: number;
  site_company_id: number;
  site_name: string;
  site_enabled: boolean;
  site_group_id?: number;
  site_manager_id?: number;
  site_address?: string;
  site_city?: string;
  site_region?: string;
  site_country?: string;
  site_zip_code?: string;
  site_geo_coord?: string;
  site_tax_rate?: string;          // Decimal as string
  site_contact_name?: string;
  site_contact_ph?: string;
  site_contact_email?: string;
  site_created: string;            // ISO 8601 datetime
  site_updated: string;            // ISO 8601 datetime
}

/**
 * Site Create data
 */
export interface SiteCreate {
  site_company_id: number;          // Company ID (required)
  site_name: string;                // Max 255 characters (required)
  site_enabled: boolean;            // Default: true
  site_group_id?: number;           // Site group ID (optional)
  site_manager_id?: number;         // Site manager user ID (optional)
  site_address?: string;            // Max 255 characters
  site_city?: string;               // Max 100 characters
  site_region?: string;             // Max 100 characters
  site_country?: string;            // Max 100 characters
  site_zip_code?: string;           // Max 20 characters
  site_geo_coord?: string;          // Max 100 characters
  site_tax_rate?: string;           // Decimal as string
  site_contact_name?: string;       // Max 255 characters
  site_contact_ph?: string;         // Max 50 characters
  site_contact_email?: string;      // Max 255 characters
}

/**
 * Site Create Request
 */
export interface SiteCreateRequest {
  site_data: SiteCreate;
}

/**
 * Site Update data
 */
export interface SiteUpdate {
  site_name?: string;
  site_enabled?: boolean;
  site_group_id?: number;
  site_manager_id?: number;
  site_address?: string;
  site_city?: string;
  site_region?: string;
  site_country?: string;
  site_zip_code?: string;
  site_geo_coord?: string;
  site_tax_rate?: string;
  site_contact_name?: string;
  site_contact_ph?: string;
  site_contact_email?: string;
}

/**
 * Site Update Request
 */
export interface SiteUpdateRequest {
  site_id: number;              // Site ID to update (auto-filled from path)
  site_data: SiteUpdate;
}

/**
 * Site Delete Request
 */
export interface SiteDeleteRequest {
  site_id: number;  // Site ID to delete (auto-filled from path)
}