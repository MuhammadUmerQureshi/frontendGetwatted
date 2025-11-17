/**
 * User Roles API Types
 * Based on /api/v1/user_roles endpoints
 */

/**
 * User Role model (response)
 */
export interface UserRole {
  user_role_id: number;
  user_role_name: string;         // Globally unique
  user_role_level: number;        // Role level/priority
  user_role_created: string;      // ISO 8601 datetime
  user_role_updated: string;      // ISO 8601 datetime
}

/**
 * User Role Create data
 */
export interface UserRoleCreate {
  user_role_name: string;     // Role name, max 255 characters, globally unique (required)
  user_role_level: number;    // Role level/priority, default: 40 (driver level)
}

/**
 * User Role Create Request
 */
export interface UserRoleCreateRequest {
  user_role_data: UserRoleCreate;
}

/**
 * User Role Update data
 */
export interface UserRoleUpdate {
  user_role_name?: string;    // Role name, max 255 characters, globally unique
  user_role_level?: number;   // Role level/priority
}

/**
 * User Role Update Request
 */
export interface UserRoleUpdateRequest {
  user_role_id: number;              // Role ID to update (auto-filled from path)
  user_role_data?: UserRoleUpdate;
}

/**
 * User Role Delete Request
 */
export interface UserRoleDeleteRequest {
  user_role_id: number;  // Role ID to delete (auto-filled from path)
}