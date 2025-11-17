import { ApiClient } from '../client/apiClient';
import {
  RemoteStartTransactionRequest,
  RemoteStartResponse,
  RemoteStopTransactionRequest,
  RemoteStopResponse,
  ResetChargerRequest,
  ChargerResetResponse,
  ActiveConnectionsResponse,
} from '../types/remoteCommands';
import { endpoints } from '../endpoints';
import { axiosClient } from '../client/axiosClient';

/**
 * Remote Commands Service
 * Handles all remote OCPP commands-related API calls
 */
export const remoteCommandsService = {
  /**
   * Send RemoteStartTransaction command to a charger
   * @param cpId - Charge point ID
   * @param idTag - RFID card UID or authorization identifier
   * @param connectorId - Specific connector ID to start transaction on
   */
  remoteStart: (cpId: number, idTag: string, connectorId: number) =>
    ApiClient.post<RemoteStartTransactionRequest, RemoteStartResponse>(
      endpoints.remoteCommands.remoteStart(cpId),
      {
        id_tag: idTag,
        connector_id: connectorId,
      }
    ),

  /**
   * Send RemoteStopTransaction command to a charger
   * @param cpId - Charge point ID
   * @param transactionId - Transaction ID (charge_session_id) to stop
   */
  remoteStop: (cpId: number, transactionId: number) =>
    ApiClient.post<RemoteStopTransactionRequest, RemoteStopResponse>(endpoints.remoteCommands.remoteStop(cpId), {
      transaction_id: transactionId,
    }),

  /**
   * Send Reset command to a charger
   * @param cpId - Charge point ID
   * @param resetType - Reset type (Soft or Hard)
   */
  reset: (cpId: number, resetType: 'Soft' | 'Hard') =>
    ApiClient.post<ResetChargerRequest, ChargerResetResponse>(endpoints.remoteCommands.reset(cpId), {
      reset_type: resetType,
    }),

  /**
   * Get list of all active WebSocket connections
   * Note: This endpoint does not use the standard ReqModel/ResModel wrapper
   */
  getActiveConnections: async (): Promise<ActiveConnectionsResponse> => {
    const response = await axiosClient.get<ActiveConnectionsResponse>(endpoints.remoteCommands.connections);
    return response.data;
  },
};