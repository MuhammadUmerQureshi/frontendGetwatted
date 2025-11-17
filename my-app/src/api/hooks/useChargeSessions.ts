import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chargeSessionsService } from '../services/chargeSessionsService';
import { queryKeys } from '../queryKeys';
import { ChargeSessionCreateRequest } from '../types/chargeSessions';

/**
 * Query: Get all charge sessions
 */
export function useChargeSessions() {
  return useQuery({
    queryKey: queryKeys.sessions.all,
    queryFn: () => chargeSessionsService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get charge session by ID
 * @param sessionId - Charge session ID to fetch
 */
export function useChargeSession(sessionId: number) {
  return useQuery({
    queryKey: queryKeys.sessions.detail(sessionId),
    queryFn: () => chargeSessionsService.getById(sessionId),
    select: (response) => response.res_data,
    enabled: !!sessionId,
  });
}

/**
 * Query: Get charge sessions by driver ID
 * @param driverId - Driver ID to look up
 */
export function useChargeSessionsByDriver(driverId: number) {
  return useQuery({
    queryKey: queryKeys.sessions.byDriver(driverId),
    queryFn: () => chargeSessionsService.getByDriverId(driverId),
    select: (response) => response.res_data,
    enabled: !!driverId,
  });
}

/**
 * Query: Get charge sessions by charge point ID
 * @param cpId - Charge point ID to look up
 */
export function useChargeSessionsByChargePoint(cpId: number) {
  return useQuery({
    queryKey: queryKeys.sessions.byChargePoint(cpId),
    queryFn: () => chargeSessionsService.getByChargePointId(cpId),
    select: (response) => response.res_data,
    enabled: !!cpId,
  });
}

/**
 * Mutation: Create charge session
 */
export function useCreateChargeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChargeSessionCreateRequest) => chargeSessionsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}

/**
 * Mutation: Update session energy
 */
export function useUpdateChargeSessionEnergy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, energyKwh }: { sessionId: number; energyKwh: string }) =>
      chargeSessionsService.updateEnergy(sessionId, energyKwh),
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.detail(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}

/**
 * Mutation: Stop charge session
 */
export function useStopChargeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      data,
    }: {
      sessionId: number;
      data: {
        charge_session_end_time: string;
        charge_session_meter_stop: number;
        charge_session_energy_kwh: string;
        charge_session_stop_reason?: string;
      };
    }) => chargeSessionsService.stop(sessionId, data),
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.detail(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}

/**
 * Mutation: Update payment status
 */
export function useUpdateChargeSessionPaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, paymentStatus }: { sessionId: number; paymentStatus: string }) =>
      chargeSessionsService.updatePaymentStatus(sessionId, paymentStatus),
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.detail(sessionId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}

/**
 * Mutation: Delete charge session
 */
export function useDeleteChargeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: number) => chargeSessionsService.delete(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}