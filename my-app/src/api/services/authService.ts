import { ApiClient } from '../client/apiClient';
import { LoginRequest, LoginResponse, LoginQueryParams } from '../types/auth';
import { endpoints } from '../endpoints';

/**
 * Authentication Service
 * Handles login and authentication-related API calls
 */
export const authService = {
  /**
   * Login user with username and password
   * @param credentials - Username and password
   * @param queryParams - Optional QR code parameters (ch and co)
   * @returns Promise with login response
   */
  login: (credentials: LoginRequest, queryParams?: LoginQueryParams) => {
    // Build query string if QR code parameters provided
    const queryString = queryParams?.ch && queryParams?.co
      ? `?ch=${encodeURIComponent(queryParams.ch)}&co=${encodeURIComponent(queryParams.co)}`
      : '';

    return ApiClient.post<LoginRequest, LoginResponse>(
      `${endpoints.auth.login}${queryString}`,
      credentials
    );
  },
};