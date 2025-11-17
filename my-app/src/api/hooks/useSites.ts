import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesService } from '../services/sitesService';
import { queryKeys } from '../queryKeys';
import { SiteCreateRequest, SiteUpdate } from '../types/sites';

/**
 * Query: Get all sites
 */
export function useSites() {
  return useQuery({
    queryKey: queryKeys.sites.all,
    queryFn: () => sitesService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get site by ID
 * @param siteId - Site ID to fetch
 */
export function useSite(siteId: number) {
  return useQuery({
    queryKey: queryKeys.sites.detail(siteId),
    queryFn: () => sitesService.getById(siteId),
    select: (response) => response.res_data,
    enabled: !!siteId,
  });
}

/**
 * Mutation: Create site
 */
export function useCreateSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SiteCreateRequest) => sitesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sites.all });
    },
  });
}

/**
 * Mutation: Update site
 */
export function useUpdateSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ siteId, data }: { siteId: number; data: SiteUpdate }) =>
      sitesService.update(siteId, data),
    onSuccess: (_, { siteId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sites.detail(siteId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.sites.all });
    },
  });
}

/**
 * Mutation: Delete site
 */
export function useDeleteSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (siteId: number) => sitesService.delete(siteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sites.all });
    },
  });
}