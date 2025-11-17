/**
 * Remote Commands API Types
 * Based on /api/v1/remote_commands endpoints
 */

/**
 * OCPP Command Status
 */
export type CommandStatusType = 'Accepted' | 'Rejected';

/**
 * Reset Type
 */
export type ResetType = 'Soft' | 'Hard';

/**
 * Remote Start Transaction Request
 */
export interface RemoteStartTransactionRequest {
  id_tag: string;         // RFID card UID or authorization identifier, max 20 characters (required)
  connector_id: number;   // Specific connector ID to start transaction on, must be > 0 (required)
}

/**
 * Remote Start Response
 */
export interface RemoteStartResponse {
  status: {
    status: CommandStatusType;        // OCPP protocol response
  };
  cp_id: number;
  cp_name: string;
  connector_id: number;
  id_tag: string;
  message?: string;                   // Additional message or error details
}

/**
 * Remote Stop Transaction Request
 */
export interface RemoteStopTransactionRequest {
  transaction_id: number;  // Transaction ID (charge_session_id) to stop, must be > 0 (required)
}

/**
 * Remote Stop Response
 */
export interface RemoteStopResponse {
  status: {
    status: CommandStatusType;        // OCPP protocol response
  };
  cp_id: number;
  cp_name: string;
  transaction_id: number;
  message?: string;                   // Additional message or error details
}

/**
 * Reset Charger Request
 */
export interface ResetChargerRequest {
  reset_type: ResetType;  // Reset type, default: "Soft" (required)
}

/**
 * Charger Reset Response
 */
export interface ChargerResetResponse {
  status: {
    status: CommandStatusType;        // OCPP protocol response
  };
  cp_id: number;
  cp_name: string;
  reset_type: string;
  message?: string;                   // Additional message or error details
}

/**
 * Active Connections Response
 * Note: This endpoint does not use the standard ReqModel/ResModel wrapper
 */
export interface ActiveConnectionsResponse {
  status: boolean;
  message: string;
  res_data: {
    connected_chargers: string[];     // Array of connected charger names
    connection_count: number;         // Total number of active connections
  };
}