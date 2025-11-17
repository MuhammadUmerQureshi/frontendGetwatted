import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { remoteCommandsService } from '../services/remoteCommandsService';
import { queryKeys } from '../queryKeys';

/**
 * Query: Get active WebSocket connections
 */
export function useActiveConnections() {
  return useQuery({
    queryKey: queryKeys.remoteCommands.connections,
    queryFn: () => remoteCommandsService.getActiveConnections(),
  });
}

/**
 * Mutation: Remote Start Transaction
 */
export function useRemoteStart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cpId, idTag, connectorId }: { cpId: number; idTag: string; connectorId: number }) =>
      remoteCommandsService.remoteStart(cpId, idTag, connectorId),
    onSuccess: (response) => {
      // Invalidate chargepoint and connector queries
      const cpId = response.res_data?.cp_id;
      if (cpId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.detail(cpId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.connectors.byChargePoint(cpId) });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}

/**
 * Mutation: Remote Stop Transaction
 */
export function useRemoteStop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cpId, transactionId }: { cpId: number; transactionId: number }) =>
      remoteCommandsService.remoteStop(cpId, transactionId),
    onSuccess: (response) => {
      // Invalidate chargepoint and connector queries
      const cpId = response.res_data?.cp_id;
      if (cpId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.detail(cpId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.connectors.byChargePoint(cpId) });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });
}

/**
 * Mutation: Reset Charger
 */
export function useResetCharger() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cpId, resetType }: { cpId: number; resetType: 'Soft' | 'Hard' }) =>
      remoteCommandsService.reset(cpId, resetType),
    onSuccess: (response) => {
      // Invalidate chargepoint and connector queries
      const cpId = response.res_data?.cp_id;
      if (cpId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.detail(cpId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.connectors.byChargePoint(cpId) });
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.all });
    },
  });
}