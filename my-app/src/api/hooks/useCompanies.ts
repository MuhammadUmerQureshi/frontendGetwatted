import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companiesService } from '../services/companiesService';
import { queryKeys } from '../queryKeys';
import { CompanyCreateRequest, CompanyUpdate } from '../types/companies';

/**
 * Query: Get all companies
 */
export function useCompanies() {
  return useQuery({
    queryKey: queryKeys.companies.all,
    queryFn: () => companiesService.getAll(),
    select: (response) => response.res_data,
  });
}

/**
 * Query: Get company by ID
 * @param companyId - Company ID to fetch
 */
export function useCompany(companyId: number) {
  return useQuery({
    queryKey: queryKeys.companies.detail(companyId),
    queryFn: () => companiesService.getById(companyId),
    select: (response) => response.res_data,
    enabled: !!companyId,
  });
}

/**
 * Mutation: Create company
 */
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CompanyCreateRequest) => companiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}

/**
 * Mutation: Update company
 */
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, data }: { companyId: number; data: CompanyUpdate }) =>
      companiesService.update(companyId, data),
    onSuccess: (_, { companyId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.detail(companyId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}

/**
 * Mutation: Delete company
 */
export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyId: number) => companiesService.delete(companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}