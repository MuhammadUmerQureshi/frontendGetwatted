import { ApiClient } from '../client/apiClient';
import {
  User,
  UserCreateRequest,
  UserUpdateRequest,
  UserDeleteRequest,
  UserUpdate,
} from '../types/users';
import { endpoints } from '../endpoints';

/**
 * Users Service
 * Handles all user-related API calls
 */
export const usersService = {
  /**
   * Get all users
   */
  getAll: () => ApiClient.get<User[]>(endpoints.users.base),

  /**
   * Get user by ID
   * @param userId - User ID to retrieve
   */
  getById: (userId: number) => ApiClient.get<User>(endpoints.users.byId(userId)),

  /**
   * Create a new user
   * @param data - User creation data with password
   */
  create: (data: UserCreateRequest) =>
    ApiClient.post<UserCreateRequest, User>(endpoints.users.base, data),

  /**
   * Update user
   * @param userId - User ID to update
   * @param data - User update data (without user_id)
   */
  update: (userId: number, data: UserUpdate) =>
    ApiClient.put<UserUpdateRequest, User>(endpoints.users.byId(userId), {
      user_id: userId,
      user_data: data,
    }),

  /**
   * Delete user
   * @param userId - User ID to delete
   */
  delete: (userId: number) =>
    ApiClient.delete<UserDeleteRequest, Record<string, any>>(endpoints.users.byId(userId), {
      user_id: userId,
    }),
};