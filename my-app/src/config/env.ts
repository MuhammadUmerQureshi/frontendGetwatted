/**
 * Environment configuration
 * Access environment variables with type safety
 */

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  appName: import.meta.env.VITE_APP_NAME || 'Getwatted-CSMS',
} as const;

/**
 * Validate required environment variables
 */
export function validateEnv(): void {
  const required = ['VITE_API_BASE_URL'];

  const missing = required.filter(key => !import.meta.env[key]);

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
    console.warn('Using default values');
  }
}