import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rfidCardsService } from '../services/rfidCardsService';
import { queryKeys } from '../queryKeys';
import { RFIDCardCreateRequest, RFIDCardUpdate } from '../types/rfidCards';

/**
 * Query: Get all RFID cards
 */
export function useRFIDCards() {
  return useQuery({
    queryKey: queryKeys.rfidCards.all,
    queryFn: () => rfidCardsService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get RFID card by ID
 * @param rfidCardId - RFID card ID to fetch
 */
export function useRFIDCard(rfidCardId: number) {
  return useQuery({
    queryKey: queryKeys.rfidCards.detail(rfidCardId),
    queryFn: () => rfidCardsService.getById(rfidCardId),
    select: (response) => response.res_data,
    enabled: !!rfidCardId,
  });
}

/**
 * Query: Get RFID card by driver ID
 * @param driverId - Driver ID to look up
 */
export function useRFIDCardByDriver(driverId: number) {
  return useQuery({
    queryKey: queryKeys.rfidCards.byDriver(driverId),
    queryFn: () => rfidCardsService.getByDriverId(driverId),
    select: (response) => response.res_data,
    enabled: !!driverId,
  });
}

/**
 * Mutation: Create RFID card
 */
export function useCreateRFIDCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RFIDCardCreateRequest) => rfidCardsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.rfidCards.all });
    },
  });
}

/**
 * Mutation: Update RFID card
 */
export function useUpdateRFIDCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rfidCardId, data }: { rfidCardId: number; data: RFIDCardUpdate }) =>
      rfidCardsService.update(rfidCardId, data),
    onSuccess: (_, { rfidCardId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.rfidCards.detail(rfidCardId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.rfidCards.all });
    },
  });
}

/**
 * Mutation: Delete RFID card
 */
export function useDeleteRFIDCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rfidCardId: number) => rfidCardsService.delete(rfidCardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.rfidCards.all });
    },
  });
}