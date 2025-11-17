/**
 * Standard Request Wrapper
 * All POST, PUT, DELETE requests use this wrapper
 */
export interface ReqModel<T> {
  id: string;
  req_data: T;
  timestamp: string;
}

/**
 * Standard Response Wrapper
 * All API responses use this wrapper
 */
export interface ResModel<U> {
  id: string;              // Request ID for correlation
  status: boolean;         // Success (true) or failure (false)
  message: string;         // Human readable message
  res_data: U | null;      // Response payload (null if error)
  timestamp: string;       // Response timestamp (ISO 8601 format)
  error_code?: string;     // Error code for failed requests (optional)
  error_details?: Record<string, any>;  // Additional error information (optional)
}

/**
 * Empty Request for endpoints that don't require data
 */
export interface EmptyRequest {}
