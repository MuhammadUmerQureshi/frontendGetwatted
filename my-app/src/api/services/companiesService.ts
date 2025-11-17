import { ApiClient } from '../client/apiClient';
import {
  Company,
  CompanyCreateRequest,
  CompanyUpdateRequest,
  CompanyDeleteRequest,
  CompanyUpdate,
} from '../types/companies';
import { endpoints } from '../endpoints';

/**
 * Companies Service
 * Handles all company-related API calls
 */
export const companiesService = {
  /**
   * Get all companies
   */
  getAll: () => ApiClient.get<Company[]>(endpoints.companies.base),

  /**
   * Get company by ID
   * @param companyId - Company ID to retrieve
   */
  getById: (companyId: number) => ApiClient.get<Company>(endpoints.companies.byId(companyId)),

  /**
   * Create a new company
   * @param data - Company creation data
   */
  create: (data: CompanyCreateRequest) =>
    ApiClient.post<CompanyCreateRequest, Company>(endpoints.companies.base, data),

  /**
   * Update company
   * @param companyId - Company ID to update
   * @param data - Company update data (without company_id)
   */
  update: (companyId: number, data: CompanyUpdate) =>
    ApiClient.put<CompanyUpdateRequest, Company>(endpoints.companies.byId(companyId), {
      company_id: companyId,
      company_data: data,
    }),

  /**
   * Delete company
   * @param companyId - Company ID to delete
   */
  delete: (companyId: number) =>
    ApiClient.delete<CompanyDeleteRequest, Record<string, any>>(endpoints.companies.byId(companyId), {
      company_id: companyId,
    }),
};