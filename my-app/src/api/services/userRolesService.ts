import { ApiClient } from '../client/apiClient';
import {
  UserRole,
  UserRoleCreateRequest,
  UserRoleUpdateRequest,
  UserRoleDeleteRequest,
  UserRoleUpdate,
} from '../types/userRoles';
import { endpoints } from '../endpoints';

/**
 * User Roles Service
 * Handles all user role-related API calls
 */
export const userRolesService = {
  /**
   * Get all user roles
   */
  getAll: () => ApiClient.get<UserRole[]>(endpoints.userRoles.base),

  /**
   * Get user role by ID
   * @param roleId - User role ID to retrieve
   */
  getById: (roleId: number) => ApiClient.get<UserRole>(endpoints.userRoles.byId(roleId)),

  /**
   * Create a new user role
   * @param data - User role creation data
   */
  create: (data: UserRoleCreateRequest) =>
    ApiClient.post<UserRoleCreateRequest, UserRole>(endpoints.userRoles.base, data),

  /**
   * Update user role
   * @param roleId - User role ID to update
   * @param data - User role update data (without user_role_id)
   */
  update: (roleId: number, data: UserRoleUpdate) =>
    ApiClient.put<UserRoleUpdateRequest, UserRole>(endpoints.userRoles.byId(roleId), {
      user_role_id: roleId,
      user_role_data: data,
    }),

  /**
   * Delete user role
   * @param roleId - User role ID to delete
   */
  delete: (roleId: number) =>
    ApiClient.delete<UserRoleDeleteRequest, Record<string, any>>(endpoints.userRoles.byId(roleId), {
      user_role_id: roleId,
    }),
};