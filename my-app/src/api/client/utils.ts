import { ReqModel, ResModel } from '../types/common';

/**
 * Generate a UUID v4
 * Compatible with all browsers
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Helper function to create a standardized request
 */
export function createRequest<T>(data: T): ReqModel<T> {
  return {
    id: generateUUID(),
    req_data: data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Type guard to check if response was successful
 */
export function isSuccessResponse<T>(response: ResModel<T>): response is ResModel<T> & { res_data: T } {
  return response.status === true && response.res_data !== null;
}

/**
 * Extract data from successful response or throw error
 */
export function extractData<T>(response: ResModel<T>): T {
  if (isSuccessResponse(response)) {
    return response.res_data;
  }
  throw new ApiError(
    response.message,
    response.error_code,
    response.error_details
  );
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public errorCode?: string,
    public errorDetails?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
