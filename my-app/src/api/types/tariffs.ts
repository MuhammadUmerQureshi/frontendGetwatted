/**
 * Tariffs API Types
 * Based on /api/v1/tariffs endpoints
 */

/**
 * Tariff model (response)
 */
export interface Tariff {
  tariffs_id: number;
  tariffs_company_id: number;
  tariffs_name: string;
  tariffs_enabled: boolean;
  tariffs_type?: string;
  tariffs_per?: string;
  tariffs_rate_daytime?: string;
  tariffs_rate_nighttime?: string;
  tariffs_daytime_from?: string;
  tariffs_daytime_to?: string;
  tariffs_nighttime_from?: string;
  tariffs_nighttime_to?: string;
  tariffs_fixed_start_fee?: string;
  tariffs_idle_charging_fee?: string;
  tariffs_idle_apply_after?: number;
  tariffs_created: string;                  // ISO 8601 datetime
  tariffs_updated: string;                  // ISO 8601 datetime
}

/**
 * Tariff Create data
 */
export interface TariffCreate {
  tariffs_company_id: number;              // Company ID (required)
  tariffs_name: string;                    // Max 255 characters (required)
  tariffs_enabled: boolean;                // Default: true
  tariffs_type?: string;                   // Max 50 characters
  tariffs_per?: string;                    // Max 50 characters (e.g., "kWh", "minute")
  tariffs_rate_daytime?: string;           // Decimal as string
  tariffs_rate_nighttime?: string;         // Decimal as string
  tariffs_daytime_from?: string;           // Time in HH:MM:SS format
  tariffs_daytime_to?: string;             // Time in HH:MM:SS format
  tariffs_nighttime_from?: string;         // Time in HH:MM:SS format
  tariffs_nighttime_to?: string;           // Time in HH:MM:SS format
  tariffs_fixed_start_fee?: string;        // Decimal as string
  tariffs_idle_charging_fee?: string;      // Decimal as string
  tariffs_idle_apply_after?: number;       // Minutes before idle fee applies
}

/**
 * Tariff Create Request
 */
export interface TariffCreateRequest {
  tariff_data: TariffCreate;
}

/**
 * Tariff Update data
 */
export interface TariffUpdate {
  tariffs_name?: string;
  tariffs_enabled?: boolean;
  tariffs_type?: string;
  tariffs_per?: string;
  tariffs_rate_daytime?: string;
  tariffs_rate_nighttime?: string;
  tariffs_daytime_from?: string;
  tariffs_daytime_to?: string;
  tariffs_nighttime_from?: string;
  tariffs_nighttime_to?: string;
  tariffs_fixed_start_fee?: string;
  tariffs_idle_charging_fee?: string;
  tariffs_idle_apply_after?: number;
}

/**
 * Tariff Update Request
 */
export interface TariffUpdateRequest {
  tariffs_id: number;              // Tariff ID to update (auto-filled from path)
  tariff_data: TariffUpdate;
}

/**
 * Tariff Delete Request
 */
export interface TariffDeleteRequest {
  tariffs_id: number;  // Tariff ID to delete (auto-filled from path)
}