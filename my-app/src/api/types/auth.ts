/**
 * Auth API Types
 * Based on /api/v1/auth endpoints
 */

/**
 * Login Request
 */
export interface LoginRequest {
  username: string;  // Username for authentication
  password: string;  // Password for authentication
}

/**
 * Charger Information (returned when logging in via QR code)
 */
export interface ChargerInfo {
  cp_id: number;         // ChargePoint ID
  cp_name: string;       // ChargePoint name
  connector_id: number;  // Connector ID
}

/**
 * Login Response
 */
export interface LoginResponse {
  access_token: string;         // JWT access token
  token_type: string;           // Token type (usually 'Bearer')
  expires_in: number;           // Token expiration time in seconds
  refresh_token?: string;       // Refresh token for token renewal (optional)
  charger_info?: ChargerInfo;   // Charger info if logged in via QR code (optional)
}

/**
 * Login Query Parameters (for QR code login)
 */
export interface LoginQueryParams {
  ch?: string;  // Charger name from QR code
  co?: string;  // Connector ID from QR code
}