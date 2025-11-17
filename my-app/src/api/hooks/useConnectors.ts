import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { connectorsService } from '../services/connectorsService';
import { queryKeys } from '../queryKeys';
import { ConnectorCreateRequest, ConnectorUpdate } from '../types/connectors';

/**
 * Query: Get all connectors for a specific charge point
 * @param cpId - Charge point ID
 */
export function useConnectorsByChargePoint(cpId: number) {
  return useQuery({
    queryKey: queryKeys.connectors.byChargePoint(cpId),
    queryFn: () => connectorsService.getByChargePoint(cpId),
    select: (response) => response.res_data,
    enabled: !!cpId,
  });
}

/**
 * Mutation: Create connector
 */
export function useCreateConnector() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ConnectorCreateRequest) => connectorsService.create(data),
    onSuccess: (response) => {
      // Invalidate connectors list for the specific charge point
      const cpId = response.res_data?.connector_cp_id;
      if (cpId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.connectors.byChargePoint(cpId) });
      }
    },
  });
}

/**
 * Mutation: Update connector
 */
export function useUpdateConnector() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ connectorId, data }: { connectorId: number; data: ConnectorUpdate }) =>
      connectorsService.update(connectorId, data),
    onSuccess: (_, { data }) => {
      // Invalidate connectors list for the specific charge point
      const cpId = data.connector_cp_id;
      if (cpId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.connectors.byChargePoint(cpId) });
      }
    },
  });
}

/**
 * Mutation: Delete connector
 */
export function useDeleteConnector() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ connectorId, cpId }: { connectorId: number; cpId: number }) =>
      connectorsService.delete(connectorId, cpId),
    onSuccess: (_, { cpId }) => {
      // Invalidate connectors list for the specific charge point
      queryClient.invalidateQueries({ queryKey: queryKeys.connectors.byChargePoint(cpId) });
    },
  });
}