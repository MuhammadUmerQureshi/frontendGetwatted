import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tariffsService } from '../services/tariffsService';
import { queryKeys } from '../queryKeys';
import { TariffCreateRequest, TariffUpdate } from '../types/tariffs';

/**
 * Query: Get all tariffs
 */
export function useTariffs() {
  return useQuery({
    queryKey: queryKeys.tariffs.all,
    queryFn: () => tariffsService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get tariff by ID
 * @param tariffId - Tariff ID to fetch
 */
export function useTariff(tariffId: number) {
  return useQuery({
    queryKey: queryKeys.tariffs.detail(tariffId),
    queryFn: () => tariffsService.getById(tariffId),
    select: (response) => response.res_data,
    enabled: !!tariffId,
  });
}

/**
 * Mutation: Create tariff
 */
export function useCreateTariff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TariffCreateRequest) => tariffsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tariffs.all });
    },
  });
}

/**
 * Mutation: Update tariff
 */
export function useUpdateTariff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tariffId, data }: { tariffId: number; data: TariffUpdate }) =>
      tariffsService.update(tariffId, data),
    onSuccess: (_, { tariffId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tariffs.detail(tariffId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tariffs.all });
    },
  });
}

/**
 * Mutation: Delete tariff
 */
export function useDeleteTariff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tariffId: number) => tariffsService.delete(tariffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tariffs.all });
    },
  });
}