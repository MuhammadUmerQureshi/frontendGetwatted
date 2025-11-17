import { ApiClient } from '../client/apiClient';
import {
  Site,
  SiteCreateRequest,
  SiteUpdateRequest,
  SiteDeleteRequest,
  SiteUpdate,
} from '../types/sites';
import { endpoints } from '../endpoints';

/**
 * Sites Service
 * Handles all sites-related API calls
 */
export const sitesService = {
  /**
   * Get all sites
   */
  getAll: () => ApiClient.get<Site[]>(endpoints.sites.base),

  /**
   * Get site by ID
   * @param siteId - Site ID to retrieve
   */
  getById: (siteId: number) => ApiClient.get<Site>(endpoints.sites.byId(siteId)),

  /**
   * Create a new site
   * @param data - Site creation data
   */
  create: (data: SiteCreateRequest) =>
    ApiClient.post<SiteCreateRequest, Site>(endpoints.sites.base, data),

  /**
   * Update site
   * @param siteId - Site ID to update
   * @param data - Site update data (without site_id)
   */
  update: (siteId: number, data: SiteUpdate) =>
    ApiClient.put<SiteUpdateRequest, Site>(endpoints.sites.byId(siteId), {
      site_id: siteId,
      site_data: data,
    }),

  /**
   * Delete site
   * @param siteId - Site ID to delete
   */
  delete: (siteId: number) =>
    ApiClient.delete<SiteDeleteRequest, Record<string, any>>(endpoints.sites.byId(siteId), {
      site_id: siteId,
    }),
};