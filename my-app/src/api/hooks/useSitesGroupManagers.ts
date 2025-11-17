import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesGroupManagersService } from '../services/sitesGroupManagersService';
import { queryKeys } from '../queryKeys';
import { SitesGroupManagerCreateRequest, SitesGroupManagerUpdate } from '../types/sitesGroupManagers';

/**
 * Query: Get all sites group managers
 */
export function useSitesGroupManagers() {
  return useQuery({
    queryKey: queryKeys.sitesGroupManagers.all,
    queryFn: () => sitesGroupManagersService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get sites group manager by ID
 * @param managerId - Manager assignment ID to fetch
 */
export function useSitesGroupManager(managerId: number) {
  return useQuery({
    queryKey: queryKeys.sitesGroupManagers.detail(managerId),
    queryFn: () => sitesGroupManagersService.getById(managerId),
    select: (response) => response.res_data,
    enabled: !!managerId,
  });
}

/**
 * Mutation: Create sites group manager
 */
export function useCreateSitesGroupManager() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SitesGroupManagerCreateRequest) => sitesGroupManagersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sitesGroupManagers.all });
    },
  });
}

/**
 * Mutation: Update sites group manager
 */
export function useUpdateSitesGroupManager() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ managerId, data }: { managerId: number; data: SitesGroupManagerUpdate }) =>
      sitesGroupManagersService.update(managerId, data),
    onSuccess: (_, { managerId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sitesGroupManagers.detail(managerId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sitesGroupManagers.all });
    },
  });
}

/**
 * Mutation: Delete sites group manager
 */
export function useDeleteSitesGroupManager() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (managerId: number) => sitesGroupManagersService.delete(managerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sitesGroupManagers.all });
    },
  });
}