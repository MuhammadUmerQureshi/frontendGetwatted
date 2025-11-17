import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driversService } from '../services/driversService';
import { queryKeys } from '../queryKeys';
import { DriverCreateRequest, DriverUpdate } from '../types/drivers';

/**
 * Query: Get all drivers
 */
export function useDrivers() {
  return useQuery({
    queryKey: queryKeys.drivers.all,
    queryFn: () => driversService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get driver by ID
 * @param driverId - Driver ID to fetch
 */
export function useDriver(driverId: number) {
  return useQuery({
    queryKey: queryKeys.drivers.detail(driverId),
    queryFn: () => driversService.getById(driverId),
    select: (response) => response.res_data,
    enabled: !!driverId,
  });
}

/**
 * Mutation: Create driver
 */
export function useCreateDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DriverCreateRequest) => driversService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
    },
  });
}

/**
 * Mutation: Update driver
 */
export function useUpdateDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ driverId, data }: { driverId: number; data: DriverUpdate }) =>
      driversService.update(driverId, data),
    onSuccess: (_, { driverId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.detail(driverId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
    },
  });
}

/**
 * Mutation: Delete driver
 */
export function useDeleteDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (driverId: number) => driversService.delete(driverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
    },
  });
}