import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chargepointsService } from '../services/chargepointsService';
import { queryKeys } from '../queryKeys';
import { ChargePointCreateRequest, ChargePointUpdate } from '../types/chargepoints';

/**
 * Query: Get all chargepoints
 */
export function useChargepoints() {
  return useQuery({
    queryKey: queryKeys.chargepoints.all,
    queryFn: () => chargepointsService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get chargepoint by ID
 * @param cpId - ChargePoint ID to fetch
 */
export function useChargepoint(cpId: number) {
  return useQuery({
    queryKey: queryKeys.chargepoints.detail(cpId),
    queryFn: () => chargepointsService.getById(cpId),
    select: (response) => response.res_data,
    enabled: !!cpId,
  });
}

/**
 * Mutation: Create chargepoint
 */
export function useCreateChargepoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChargePointCreateRequest) => chargepointsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.all });
    },
  });
}

/**
 * Mutation: Update chargepoint
 */
export function useUpdateChargepoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cpId, data }: { cpId: number; data: ChargePointUpdate }) =>
      chargepointsService.update(cpId, data),
    onSuccess: (_, { cpId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.detail(cpId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.all });
    },
  });
}

/**
 * Mutation: Delete chargepoint
 */
export function useDeleteChargepoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cpId: number) => chargepointsService.delete(cpId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chargepoints.all });
    },
  });
}