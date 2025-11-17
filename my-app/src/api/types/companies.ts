/**
 * Companies API Types
 * Based on /api/v1/companies endpoints
 */

/**
 * Company model (response)
 */
export interface Company {
  company_id: number;
  company_name: string;             // Globally unique
  company_enabled: boolean;
  company_home_photo?: string;
  company_brand_colour?: string;
  company_brand_logo?: string;
  company_brand_favicon?: string;
  company_created: string;          // ISO 8601 datetime
  company_updated: string;          // ISO 8601 datetime
}

/**
 * Company Create data
 */
export interface CompanyCreate {
  company_name: string;              // Max 255 characters, globally unique (required)
  company_enabled: boolean;          // Default: false
  company_home_photo?: string;       // Home photo URL, max 255 characters
  company_brand_colour?: string;     // Brand color, max 50 characters
  company_brand_logo?: string;       // Brand logo URL, max 255 characters
  company_brand_favicon?: string;    // Favicon URL, max 255 characters
}

/**
 * Company Create Request
 */
export interface CompanyCreateRequest {
  company_data: CompanyCreate;
}

/**
 * Company Update data
 */
export interface CompanyUpdate {
  company_name?: string;            // Max 255 characters, globally unique
  company_enabled?: boolean;
  company_home_photo?: string;      // Max 255 characters
  company_brand_colour?: string;    // Max 50 characters
  company_brand_logo?: string;      // Max 255 characters
  company_brand_favicon?: string;   // Max 255 characters
}

/**
 * Company Update Request
 */
export interface CompanyUpdateRequest {
  company_id: number;              // Company ID to update (auto-filled from path)
  company_data: CompanyUpdate;
}

/**
 * Company Delete Request
 */
export interface CompanyDeleteRequest {
  company_id: number;  // Company ID to delete (auto-filled from path)
}