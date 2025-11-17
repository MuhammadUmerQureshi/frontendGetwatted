/**
 * Charge Sessions API Types
 * Based on /api/v1/chargesessions endpoints
 */

/**
 * OCPP 1.6 Stop Reasons
 */
export type StopReasonType =
  | 'Local'
  | 'Remote'
  | 'EmergencyStop'
  | 'EVDisconnected'
  | 'HardReset'
  | 'SoftReset'
  | 'PowerLoss'
  | 'Reboot'
  | 'Other';

/**
 * Payment Status
 */
export type PaymentStatusType = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

/**
 * Session Status
 */
export type SessionStatusType = 'In Progress' | 'Completed' | 'Cancelled' | 'Failed';

/**
 * Charge Session model (response)
 */
export interface ChargeSession {
  charge_session_id: number;
  charge_session_connector_id: number;
  charge_session_cp_id: number;
  charge_session_driver_id?: number;
  charge_session_rfid_card_id?: number;
  charge_session_tariff_id?: number;
  charge_session_start_time?: string;         // ISO 8601 datetime
  charge_session_end_time?: string;           // ISO 8601 datetime
  charge_session_duration?: number;           // Duration in seconds
  charge_session_stop_reason?: string;
  charge_session_status: string;              // "In Progress", "Completed", "Cancelled", "Failed"
  charge_session_meter_start?: number;        // Wh
  charge_session_meter_stop?: number;         // Wh
  charge_session_energy_kwh?: string;         // kWh (decimal as string)
  charge_session_cost?: string;               // Cost (decimal as string)
  charge_session_payment_status: string;      // "Pending", "Paid", "Failed", "Refunded"
  charge_session_created: string;             // ISO 8601 datetime
}

/**
 * Charge Session Create data
 */
export interface ChargeSessionCreate {
  charge_session_connector_id: number;        // Connector ID (required)
  charge_session_cp_id: number;               // Charge point ID (required)
  charge_session_driver_id?: number;          // Driver ID
  charge_session_rfid_card_id?: number;       // RFID card ID used
  charge_session_tariff_id?: number;          // Tariff ID for pricing
  charge_session_start_time: string;          // ISO 8601 datetime (required)
  charge_session_meter_start: number;         // Meter value at start in Wh, default: 0
}

/**
 * Charge Session Create Request
 */
export interface ChargeSessionCreateRequest {
  session_data: ChargeSessionCreate;
}

/**
 * Charge Session Update Energy Request
 */
export interface ChargeSessionUpdateEnergyRequest {
  session_id: number;                         // Session ID (auto-filled from path)
  session_data: {
    charge_session_energy_kwh: string;        // Energy in kWh (decimal as string, required)
  };
}

/**
 * Charge Session Stop Request
 */
export interface ChargeSessionStopRequest {
  session_id: number;                         // Session ID (auto-filled from path)
  session_data: {
    charge_session_end_time: string;          // ISO 8601 datetime (required)
    charge_session_meter_stop: number;        // Meter value at stop in Wh (required)
    charge_session_energy_kwh: string;        // Final energy in kWh (required)
    charge_session_stop_reason?: StopReasonType;
  };
}

/**
 * Charge Session Update Payment Status Request
 */
export interface ChargeSessionUpdatePaymentStatusRequest {
  session_id: number;                         // Session ID (auto-filled from path)
  session_data: {
    charge_session_payment_status: PaymentStatusType;  // Required
  };
}

/**
 * Charge Session Delete Request
 */
export interface ChargeSessionDeleteRequest {
  charge_session_id: number;  // Session ID to delete (auto-filled from path)
}