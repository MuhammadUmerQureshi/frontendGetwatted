import { ApiClient } from '../client/apiClient';
import {
  SitesGroupManager,
  SitesGroupManagerCreateRequest,
  SitesGroupManagerUpdateRequest,
  SitesGroupManagerDeleteRequest,
  SitesGroupManagerUpdate,
} from '../types/sitesGroupManagers';
import { endpoints } from '../endpoints';

/**
 * Sites Group Managers Service
 * Handles all site group managers-related API calls
 */
export const sitesGroupManagersService = {
  /**
   * Get all sites group managers
   */
  getAll: () => ApiClient.get<SitesGroupManager[]>(endpoints.sitesGroupManagers.base),

  /**
   * Get sites group manager by ID
   * @param managerId - Manager assignment ID to retrieve
   */
  getById: (managerId: number) => ApiClient.get<SitesGroupManager>(endpoints.sitesGroupManagers.byId(managerId)),

  /**
   * Create a new sites group manager assignment
   * @param data - Sites group manager creation data
   */
  create: (data: SitesGroupManagerCreateRequest) =>
    ApiClient.post<SitesGroupManagerCreateRequest, SitesGroupManager>(endpoints.sitesGroupManagers.base, data),

  /**
   * Update sites group manager assignment
   * @param managerId - Manager assignment ID to update
   * @param data - Sites group manager update data (without id)
   */
  update: (managerId: number, data: SitesGroupManagerUpdate) =>
    ApiClient.put<SitesGroupManagerUpdateRequest, SitesGroupManager>(endpoints.sitesGroupManagers.byId(managerId), {
      id: managerId,
      manager_data: data,
    }),

  /**
   * Delete sites group manager assignment
   * @param managerId - Manager assignment ID to delete
   */
  delete: (managerId: number) =>
    ApiClient.delete<SitesGroupManagerDeleteRequest, Record<string, any>>(endpoints.sitesGroupManagers.byId(managerId), {
      id: managerId,
    }),
};