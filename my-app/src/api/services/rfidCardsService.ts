import { ApiClient } from '../client/apiClient';
import {
  RFIDCard,
  RFIDCardCreateRequest,
  RFIDCardUpdateRequest,
  RFIDCardDeleteRequest,
  RFIDCardUpdate,
} from '../types/rfidCards';
import { endpoints } from '../endpoints';

/**
 * RFID Cards Service
 * Handles all RFID cards-related API calls
 */
export const rfidCardsService = {
  /**
   * Get all RFID cards
   */
  getAll: () => ApiClient.get<RFIDCard[]>(endpoints.rfidCards.base),

  /**
   * Get RFID card by ID
   * @param rfidCardId - RFID card ID to retrieve
   */
  getById: (rfidCardId: number) => ApiClient.get<RFIDCard>(endpoints.rfidCards.byId(rfidCardId)),

  /**
   * Get RFID card by driver ID
   * @param driverId - Driver ID to look up
   */
  getByDriverId: (driverId: number) => ApiClient.get<RFIDCard>(endpoints.rfidCards.byDriver(driverId)),

  /**
   * Create a new RFID card
   * @param data - RFID card creation data
   */
  create: (data: RFIDCardCreateRequest) =>
    ApiClient.post<RFIDCardCreateRequest, RFIDCard>(endpoints.rfidCards.base, data),

  /**
   * Update RFID card
   * @param rfidCardId - RFID card ID to update
   * @param data - RFID card update data (without rfid_card_id)
   */
  update: (rfidCardId: number, data: RFIDCardUpdate) =>
    ApiClient.put<RFIDCardUpdateRequest, RFIDCard>(endpoints.rfidCards.byId(rfidCardId), {
      rfid_card_id: rfidCardId,
      rfid_card_data: data,
    }),

  /**
   * Delete RFID card
   * @param rfidCardId - RFID card ID to delete
   */
  delete: (rfidCardId: number) =>
    ApiClient.delete<RFIDCardDeleteRequest, Record<string, any>>(endpoints.rfidCards.byId(rfidCardId), {
      rfid_card_id: rfidCardId,
    }),
};