/**
 * Users API Types
 * Based on /api/v1/users endpoints
 */

/**
 * User model (response)
 */
export interface User {
  user_id: number;
  user_keycloak_id: string;       // Keycloak user ID for authentication
  user_first_name?: string;
  user_last_name?: string;
  user_email?: string;            // Globally unique
  user_phone?: string;
  user_role_id?: number;
  user_company_id?: number;
  user_created: string;           // ISO 8601 datetime
  user_updated: string;           // ISO 8601 datetime
}

/**
 * User Create data
 */
export interface UserCreate {
  user_first_name: string;        // Max 100 characters (required)
  user_last_name: string;         // Max 100 characters (required)
  user_email: string;             // Email address, globally unique (required)
  user_phone?: string;            // Max 50 characters (optional)
  user_role_id?: number;          // Foreign key to user_roles (optional)
  user_company_id?: number;       // Foreign key to companies (optional)
}

/**
 * User Create Request
 */
export interface UserCreateRequest {
  user_data: UserCreate;
  password: string;  // User password for Keycloak
}

/**
 * User Update data
 */
export interface UserUpdate {
  user_first_name?: string;   // Max 100 characters
  user_last_name?: string;    // Max 100 characters
  user_email?: string;        // Globally unique
  user_phone?: string;        // Max 50 characters
  user_role_id?: number;
  user_company_id?: number;
}

/**
 * User Update Request
 */
export interface UserUpdateRequest {
  user_id: number;           // User ID to update (auto-filled from path)
  user_data: UserUpdate;
}

/**
 * User Delete Request
 */
export interface UserDeleteRequest {
  user_id: number;  // User ID to delete (auto-filled from path)
}