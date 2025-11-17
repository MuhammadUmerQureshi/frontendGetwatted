import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driversGroupsService } from '../services/driversGroupsService';
import { queryKeys } from '../queryKeys';
import { DriversGroupCreateRequest, DriversGroupUpdate } from '../types/driversGroups';

/**
 * Query: Get all drivers groups
 */
export function useDriversGroups() {
  return useQuery({
    queryKey: queryKeys.driversGroups.all,
    queryFn: () => driversGroupsService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get drivers group by ID
 * @param driversGroupId - Drivers group ID to fetch
 */
export function useDriversGroup(driversGroupId: number) {
  return useQuery({
    queryKey: queryKeys.driversGroups.detail(driversGroupId),
    queryFn: () => driversGroupsService.getById(driversGroupId),
    select: (response) => response.res_data,
    enabled: !!driversGroupId,
  });
}

/**
 * Mutation: Create drivers group
 */
export function useCreateDriversGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DriversGroupCreateRequest) => driversGroupsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.driversGroups.all });
    },
  });
}

/**
 * Mutation: Update drivers group
 */
export function useUpdateDriversGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ driversGroupId, data }: { driversGroupId: number; data: DriversGroupUpdate }) =>
      driversGroupsService.update(driversGroupId, data),
    onSuccess: (_, { driversGroupId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.driversGroups.detail(driversGroupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.driversGroups.all });
    },
  });
}

/**
 * Mutation: Delete drivers group
 */
export function useDeleteDriversGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (driversGroupId: number) => driversGroupsService.delete(driversGroupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.driversGroups.all });
    },
  });
}