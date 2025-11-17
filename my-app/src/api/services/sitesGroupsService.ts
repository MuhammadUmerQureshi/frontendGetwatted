import { ApiClient } from '../client/apiClient';
import {
  SitesGroup,
  SitesGroupCreateRequest,
  SitesGroupUpdateRequest,
  SitesGroupDeleteRequest,
  SitesGroupUpdate,
} from '../types/sitesGroups';
import { endpoints } from '../endpoints';

/**
 * Sites Groups Service
 * Handles all site groups-related API calls
 */
export const sitesGroupsService = {
  /**
   * Get all sites groups
   */
  getAll: () => ApiClient.get<SitesGroup[]>(endpoints.sitesGroups.base),

  /**
   * Get sites group by ID
   * @param siteGroupId - Site group ID to retrieve
   */
  getById: (siteGroupId: number) => ApiClient.get<SitesGroup>(endpoints.sitesGroups.byId(siteGroupId)),

  /**
   * Create a new sites group
   * @param data - Sites group creation data
   */
  create: (data: SitesGroupCreateRequest) =>
    ApiClient.post<SitesGroupCreateRequest, SitesGroup>(endpoints.sitesGroups.base, data),

  /**
   * Update sites group
   * @param siteGroupId - Site group ID to update
   * @param data - Sites group update data (without site_group_id)
   */
  update: (siteGroupId: number, data: SitesGroupUpdate) =>
    ApiClient.put<SitesGroupUpdateRequest, SitesGroup>(endpoints.sitesGroups.byId(siteGroupId), {
      site_group_id: siteGroupId,
      site_group_data: data,
    }),

  /**
   * Delete sites group
   * @param siteGroupId - Site group ID to delete
   */
  delete: (siteGroupId: number) =>
    ApiClient.delete<SitesGroupDeleteRequest, Record<string, any>>(endpoints.sitesGroups.byId(siteGroupId), {
      site_group_id: siteGroupId,
    }),
};