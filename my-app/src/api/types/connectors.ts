/**
 * Connectors API Types
 * Based on /api/v1/connectors endpoints
 */

/**
 * OCPP 1.6 Connector Status
 */
export type ConnectorStatusType =
  | 'Available'
  | 'Preparing'
  | 'Charging'
  | 'SuspendedEVSE'
  | 'SuspendedEV'
  | 'Finishing'
  | 'Reserved'
  | 'Unavailable'
  | 'Faulted';

/**
 * OCPP 1.6 Connector Error Codes
 */
export type ConnectorErrorCodeType =
  | 'NoError'
  | 'ConnectorLockFailure'
  | 'EVCommunicationError'
  | 'GroundFailure'
  | 'HighTemperature'
  | 'InternalError'
  | 'LocalListConflict'
  | 'OtherError'
  | 'OverCurrentFailure'
  | 'PowerMeterFailure'
  | 'PowerSwitchFailure'
  | 'ReaderFailure'
  | 'ResetFailure'
  | 'UnderVoltage'
  | 'OverVoltage'
  | 'WeakSignal';

/**
 * Connector model (response)
 */
export interface Connector {
  connector_id: number;
  connector_cp_id: number;
  connector_type?: string;
  connector_status?: string;
  connector_error_code?: string;
  connector_enabled: boolean;
  connector_max_volt?: string;
  connector_max_amp?: string;
  connector_created: string;          // ISO 8601 datetime
  connector_updated: string;          // ISO 8601 datetime
}

/**
 * Connector Create data
 */
export interface ConnectorCreate {
  connector_id: number;                     // Connector number: 1, 2, 3, etc. (required)
  connector_cp_id: number;                  // Charge point ID (required)
  connector_type?: string;                  // Connector type (Type2, CCS, CHAdeMO, etc.)
  connector_status: ConnectorStatusType;    // Default: "Available"
  connector_error_code: ConnectorErrorCodeType;  // Default: "NoError"
  connector_enabled: boolean;               // Default: true
  connector_max_volt?: string;              // Max voltage (decimal as string)
  connector_max_amp?: string;               // Max amperage (decimal as string)
}

/**
 * Connector Create Request
 */
export interface ConnectorCreateRequest {
  connector_data: ConnectorCreate;
}

/**
 * Connector Update data
 */
export interface ConnectorUpdate {
  connector_cp_id: number;                  // Charge point ID (required for composite key)
  connector_type?: string;
  connector_status?: ConnectorStatusType;
  connector_error_code?: ConnectorErrorCodeType;
  connector_enabled?: boolean;
  connector_max_volt?: string;
  connector_max_amp?: string;
}

/**
 * Connector Update Request
 */
export interface ConnectorUpdateRequest {
  connector_id: number;                     // Connector ID to update (auto-filled from path)
  connector_data: ConnectorUpdate;
}

/**
 * Connector Delete Request
 */
export interface ConnectorDeleteRequest {
  connector_id: number;                     // Connector ID to delete (auto-filled from path)
  connector_cp_id: number;                  // Charge point ID (required for composite key)
}