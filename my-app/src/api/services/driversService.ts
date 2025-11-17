import { ApiClient } from '../client/apiClient';
import {
  Driver,
  DriverCreateRequest,
  DriverUpdateRequest,
  DriverDeleteRequest,
  DriverUpdate,
} from '../types/drivers';
import { endpoints } from '../endpoints';

/**
 * Drivers Service
 * Handles all drivers-related API calls
 */
export const driversService = {
  /**
   * Get all drivers
   */
  getAll: () => ApiClient.get<Driver[]>(endpoints.drivers.base),

  /**
   * Get driver by ID
   * @param driverId - Driver ID to retrieve
   */
  getById: (driverId: number) => ApiClient.get<Driver>(endpoints.drivers.byId(driverId)),

  /**
   * Create a new driver
   * @param data - Driver creation data
   */
  create: (data: DriverCreateRequest) =>
    ApiClient.post<DriverCreateRequest, Driver>(endpoints.drivers.base, data),

  /**
   * Update driver
   * @param driverId - Driver ID to update
   * @param data - Driver update data (without driver_id)
   */
  update: (driverId: number, data: DriverUpdate) =>
    ApiClient.put<DriverUpdateRequest, Driver>(endpoints.drivers.byId(driverId), {
      driver_id: driverId,
      driver_data: data,
    }),

  /**
   * Delete driver
   * @param driverId - Driver ID to delete
   */
  delete: (driverId: number) =>
    ApiClient.delete<DriverDeleteRequest, Record<string, any>>(endpoints.drivers.byId(driverId), {
      driver_id: driverId,
    }),
};