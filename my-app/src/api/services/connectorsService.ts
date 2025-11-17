import { ApiClient } from '../client/apiClient';
import {
  Connector,
  ConnectorCreateRequest,
  ConnectorUpdateRequest,
  ConnectorDeleteRequest,
  ConnectorUpdate,
} from '../types/connectors';
import { endpoints } from '../endpoints';

/**
 * Connectors Service
 * Handles all connectors-related API calls
 */
export const connectorsService = {
  /**
   * Get all connectors for a specific charge point
   * @param cpId - Charge point ID
   */
  getByChargePoint: (cpId: number) => ApiClient.get<Connector[]>(endpoints.connectors.byChargePoint(cpId)),

  /**
   * Create a new connector
   * @param data - Connector creation data
   */
  create: (data: ConnectorCreateRequest) =>
    ApiClient.post<ConnectorCreateRequest, Connector>(endpoints.connectors.base, data),

  /**
   * Update connector
   * @param connectorId - Connector ID to update
   * @param data - Connector update data (including connector_cp_id for composite key)
   */
  update: (connectorId: number, data: ConnectorUpdate) =>
    ApiClient.put<ConnectorUpdateRequest, Connector>(endpoints.connectors.byId(connectorId), {
      connector_id: connectorId,
      connector_data: data,
    }),

  /**
   * Delete connector
   * @param connectorId - Connector ID to delete
   * @param cpId - Charge point ID (required for composite key)
   */
  delete: (connectorId: number, cpId: number) =>
    ApiClient.delete<ConnectorDeleteRequest, Record<string, any>>(endpoints.connectors.byId(connectorId), {
      connector_id: connectorId,
      connector_cp_id: cpId,
    }),
};