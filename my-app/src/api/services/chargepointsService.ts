import { ApiClient } from '../client/apiClient';
import {
  ChargePoint,
  ChargePointCreateRequest,
  ChargePointUpdateRequest,
  ChargePointDeleteRequest,
  ChargePointUpdate,
} from '../types/chargepoints';
import { endpoints } from '../endpoints';

/**
 * ChargePoints Service
 * Handles all chargepoints-related API calls
 */
export const chargepointsService = {
  /**
   * Get all chargepoints
   */
  getAll: () => ApiClient.get<ChargePoint[]>(endpoints.chargepoints.base),

  /**
   * Get chargepoint by ID
   * @param cpId - ChargePoint ID to retrieve
   */
  getById: (cpId: number) => ApiClient.get<ChargePoint>(endpoints.chargepoints.byId(cpId)),

  /**
   * Create a new chargepoint
   * @param data - ChargePoint creation data
   */
  create: (data: ChargePointCreateRequest) =>
    ApiClient.post<ChargePointCreateRequest, ChargePoint>(endpoints.chargepoints.base, data),

  /**
   * Update chargepoint
   * @param cpId - ChargePoint ID to update
   * @param data - ChargePoint update data (without cp_id)
   */
  update: (cpId: number, data: ChargePointUpdate) =>
    ApiClient.put<ChargePointUpdateRequest, ChargePoint>(endpoints.chargepoints.byId(cpId), {
      cp_id: cpId,
      cp_data: data,
    }),

  /**
   * Delete chargepoint
   * @param cpId - ChargePoint ID to delete
   */
  delete: (cpId: number) =>
    ApiClient.delete<ChargePointDeleteRequest, Record<string, any>>(endpoints.chargepoints.byId(cpId), {
      cp_id: cpId,
    }),
};