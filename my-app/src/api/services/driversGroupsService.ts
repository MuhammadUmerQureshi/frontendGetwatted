import { ApiClient } from '../client/apiClient';
import {
  DriversGroup,
  DriversGroupCreateRequest,
  DriversGroupUpdateRequest,
  DriversGroupDeleteRequest,
  DriversGroupUpdate,
} from '../types/driversGroups';
import { endpoints } from '../endpoints';

/**
 * Drivers Groups Service
 * Handles all drivers groups-related API calls
 */
export const driversGroupsService = {
  /**
   * Get all drivers groups
   */
  getAll: () => ApiClient.get<DriversGroup[]>(endpoints.driversGroups.base),

  /**
   * Get drivers group by ID
   * @param driversGroupId - Drivers group ID to retrieve
   */
  getById: (driversGroupId: number) => ApiClient.get<DriversGroup>(endpoints.driversGroups.byId(driversGroupId)),

  /**
   * Create a new drivers group
   * @param data - Drivers group creation data
   */
  create: (data: DriversGroupCreateRequest) =>
    ApiClient.post<DriversGroupCreateRequest, DriversGroup>(endpoints.driversGroups.base, data),

  /**
   * Update drivers group
   * @param driversGroupId - Drivers group ID to update
   * @param data - Drivers group update data (without drivers_group_id)
   */
  update: (driversGroupId: number, data: DriversGroupUpdate) =>
    ApiClient.put<DriversGroupUpdateRequest, DriversGroup>(endpoints.driversGroups.byId(driversGroupId), {
      drivers_group_id: driversGroupId,
      drivers_group_data: data,
    }),

  /**
   * Delete drivers group
   * @param driversGroupId - Drivers group ID to delete
   */
  delete: (driversGroupId: number) =>
    ApiClient.delete<DriversGroupDeleteRequest, Record<string, any>>(endpoints.driversGroups.byId(driversGroupId), {
      drivers_group_id: driversGroupId,
    }),
};