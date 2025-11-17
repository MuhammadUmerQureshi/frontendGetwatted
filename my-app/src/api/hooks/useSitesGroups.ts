import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesGroupsService } from '../services/sitesGroupsService';
import { queryKeys } from '../queryKeys';
import { SitesGroupCreateRequest, SitesGroupUpdate } from '../types/sitesGroups';

/**
 * Query: Get all sites groups
 */
export function useSitesGroups() {
  return useQuery({
    queryKey: queryKeys.sitesGroups.all,
    queryFn: () => sitesGroupsService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get sites group by ID
 * @param siteGroupId - Site group ID to fetch
 */
export function useSitesGroup(siteGroupId: number) {
  return useQuery({
    queryKey: queryKeys.sitesGroups.detail(siteGroupId),
    queryFn: () => sitesGroupsService.getById(siteGroupId),
    select: (response) => response.res_data,
    enabled: !!siteGroupId,
  });
}

/**
 * Mutation: Create sites group
 */
export function useCreateSitesGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SitesGroupCreateRequest) => sitesGroupsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sitesGroups.all });
    },
  });
}

/**
 * Mutation: Update sites group
 */
export function useUpdateSitesGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ siteGroupId, data }: { siteGroupId: number; data: SitesGroupUpdate }) =>
      sitesGroupsService.update(siteGroupId, data),
    onSuccess: (_, { siteGroupId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sitesGroups.detail(siteGroupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sitesGroups.all });
    },
  });
}

/**
 * Mutation: Delete sites group
 */
export function useDeleteSitesGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (siteGroupId: number) => sitesGroupsService.delete(siteGroupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sitesGroups.all });
    },
  });
}