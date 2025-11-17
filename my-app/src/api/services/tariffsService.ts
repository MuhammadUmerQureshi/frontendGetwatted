import { ApiClient } from '../client/apiClient';
import {
  Tariff,
  TariffCreateRequest,
  TariffUpdateRequest,
  TariffDeleteRequest,
  TariffUpdate,
} from '../types/tariffs';
import { endpoints } from '../endpoints';

/**
 * Tariffs Service
 * Handles all tariffs-related API calls
 */
export const tariffsService = {
  /**
   * Get all tariffs
   */
  getAll: () => ApiClient.get<Tariff[]>(endpoints.tariffs.base),

  /**
   * Get tariff by ID
   * @param tariffId - Tariff ID to retrieve
   */
  getById: (tariffId: number) => ApiClient.get<Tariff>(endpoints.tariffs.byId(tariffId)),

  /**
   * Create a new tariff
   * @param data - Tariff creation data
   */
  create: (data: TariffCreateRequest) =>
    ApiClient.post<TariffCreateRequest, Tariff>(endpoints.tariffs.base, data),

  /**
   * Update tariff
   * @param tariffId - Tariff ID to update
   * @param data - Tariff update data (without tariffs_id)
   */
  update: (tariffId: number, data: TariffUpdate) =>
    ApiClient.put<TariffUpdateRequest, Tariff>(endpoints.tariffs.byId(tariffId), {
      tariffs_id: tariffId,
      tariff_data: data,
    }),

  /**
   * Delete tariff
   * @param tariffId - Tariff ID to delete
   */
  delete: (tariffId: number) =>
    ApiClient.delete<TariffDeleteRequest, Record<string, any>>(endpoints.tariffs.byId(tariffId), {
      tariffs_id: tariffId,
    }),
};