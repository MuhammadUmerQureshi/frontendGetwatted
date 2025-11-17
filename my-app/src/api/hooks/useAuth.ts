import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import type { LoginRequest, LoginResponse, LoginQueryParams } from '../types/auth';
import type { ResModel } from '../types/common';

/**
 * Login Mutation Hook
 * Handles user authentication
 */
export function useLogin() {
  return useMutation<
    ResModel<LoginResponse>,
    Error,
    { credentials: LoginRequest; queryParams?: LoginQueryParams }
  >({
    mutationFn: ({ credentials, queryParams }) =>
      authService.login(credentials, queryParams),
    onSuccess: (response) => {
      if (response.status && response.res_data) {
        // Store tokens in localStorage
        localStorage.setItem('access_token', response.res_data.access_token);
        localStorage.setItem('token_type', response.res_data.token_type);
        localStorage.setItem('expires_in', response.res_data.expires_in.toString());

        if (response.res_data.refresh_token) {
          localStorage.setItem('refresh_token', response.res_data.refresh_token);
        }

        // Store charger info if QR code login
        if (response.res_data.charger_info) {
          localStorage.setItem(
            'charger_info',
            JSON.stringify(response.res_data.charger_info)
          );
        }
      }
    },
  });
}

/**
 * Logout function
 * Clears all authentication data from localStorage
 */
export function useLogout() {
  return () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('charger_info');

    // Redirect to login page
    window.location.href = '/login';
  };
}

/**
 * Check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const token = localStorage.getItem('access_token');
  return !!token;
}

/**
 * Get stored charger info (if logged in via QR code)
 */
export function useChargerInfo() {
  const chargerInfoStr = localStorage.getItem('charger_info');
  if (!chargerInfoStr) return null;

  try {
    return JSON.parse(chargerInfoStr);
  } catch {
    return null;
  }
}