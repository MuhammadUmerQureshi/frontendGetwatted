import { ApiClient } from '../client/apiClient';
import {
  ChargeSession,
  ChargeSessionCreateRequest,
  ChargeSessionUpdateEnergyRequest,
  ChargeSessionStopRequest,
  ChargeSessionUpdatePaymentStatusRequest,
  ChargeSessionDeleteRequest,
} from '../types/chargeSessions';
import { endpoints } from '../endpoints';

/**
 * Charge Sessions Service
 * Handles all charge sessions-related API calls
 */
export const chargeSessionsService = {
  /**
   * Get all charge sessions
   */
  getAll: () => ApiClient.get<ChargeSession[]>(endpoints.sessions.base),

  /**
   * Get charge session by ID
   * @param sessionId - Charge session ID to retrieve
   */
  getById: (sessionId: number) => ApiClient.get<ChargeSession>(endpoints.sessions.byId(sessionId)),

  /**
   * Get charge sessions by driver ID
   * @param driverId - Driver ID to look up
   */
  getByDriverId: (driverId: number) => ApiClient.get<ChargeSession[]>(endpoints.sessions.byDriver(driverId)),

  /**
   * Get charge sessions by charge point ID
   * @param cpId - Charge point ID to look up
   */
  getByChargePointId: (cpId: number) => ApiClient.get<ChargeSession[]>(endpoints.sessions.byChargePoint(cpId)),

  /**
   * Create a new charge session
   * @param data - Charge session creation data
   */
  create: (data: ChargeSessionCreateRequest) =>
    ApiClient.post<ChargeSessionCreateRequest, ChargeSession>(endpoints.sessions.base, data),

  /**
   * Update session energy consumption
   * @param sessionId - Charge session ID to update
   * @param energyKwh - Energy in kWh
   */
  updateEnergy: (sessionId: number, energyKwh: string) =>
    ApiClient.put<ChargeSessionUpdateEnergyRequest, ChargeSession>(endpoints.sessions.updateEnergy(sessionId), {
      session_id: sessionId,
      session_data: {
        charge_session_energy_kwh: energyKwh,
      },
    }),

  /**
   * Stop charge session
   * @param sessionId - Charge session ID to stop
   * @param data - Stop session data
   */
  stop: (
    sessionId: number,
    data: {
      charge_session_end_time: string;
      charge_session_meter_stop: number;
      charge_session_energy_kwh: string;
      charge_session_stop_reason?: string;
    }
  ) =>
    ApiClient.put<ChargeSessionStopRequest, ChargeSession>(endpoints.sessions.stop(sessionId), {
      session_id: sessionId,
      session_data: data,
    }),

  /**
   * Update payment status
   * @param sessionId - Charge session ID to update
   * @param paymentStatus - New payment status
   */
  updatePaymentStatus: (sessionId: number, paymentStatus: string) =>
    ApiClient.put<ChargeSessionUpdatePaymentStatusRequest, ChargeSession>(
      endpoints.sessions.updatePaymentStatus(sessionId),
      {
        session_id: sessionId,
        session_data: {
          charge_session_payment_status: paymentStatus as any,
        },
      }
    ),

  /**
   * Delete charge session
   * @param sessionId - Charge session ID to delete
   */
  delete: (sessionId: number) =>
    ApiClient.delete<ChargeSessionDeleteRequest, Record<string, any>>(endpoints.sessions.byId(sessionId), {
      charge_session_id: sessionId,
    }),
};