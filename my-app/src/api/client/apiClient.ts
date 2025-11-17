import axiosClient from './axiosClient';
import { ReqModel, ResModel } from '../types/common';
import { createRequest } from './utils';

/**
 * Generic API Client
 * Provides type-safe methods for making HTTP requests
 */
export class ApiClient {
  /**
   * GET request
   * @param url - Endpoint URL
   * @returns Promise with standardized response
   */
  static async get<T>(url: string): Promise<ResModel<T>> {
    const response = await axiosClient.get<ResModel<T>>(url);
    return response.data;
  }

  /**
   * POST request with standardized wrapper
   * @param url - Endpoint URL
   * @param data - Request data
   * @returns Promise with standardized response
   */
  static async post<TRequest, TResponse>(
    url: string,
    data: TRequest
  ): Promise<ResModel<TResponse>> {
    const wrappedRequest = createRequest(data);
    const response = await axiosClient.post<ResModel<TResponse>>(url, wrappedRequest);
    return response.data;
  }

  /**
   * PUT request with standardized wrapper
   * @param url - Endpoint URL
   * @param data - Request data
   * @returns Promise with standardized response
   */
  static async put<TRequest, TResponse>(
    url: string,
    data: TRequest
  ): Promise<ResModel<TResponse>> {
    const wrappedRequest = createRequest(data);
    const response = await axiosClient.put<ResModel<TResponse>>(url, wrappedRequest);
    return response.data;
  }

  /**
   * DELETE request with standardized wrapper
   * @param url - Endpoint URL
   * @param data - Request data
   * @returns Promise with standardized response
   */
  static async delete<TRequest, TResponse>(
    url: string,
    data: TRequest
  ): Promise<ResModel<TResponse>> {
    const wrappedRequest = createRequest(data);
    const response = await axiosClient.delete<ResModel<TResponse>>(url, {
      data: wrappedRequest,
    });
    return response.data;
  }
}