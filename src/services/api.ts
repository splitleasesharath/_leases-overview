import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  Booking,
  Lease,
  LeaseSearchParams,
  PaginatedResponse,
  ApiError,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.splitlease.com';
const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to transform API error
const transformError = (error: AxiosError<ApiError>): ApiError => {
  if (error.response?.data) {
    return error.response.data;
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || 'An unexpected error occurred',
  };
};

// Bookings/Leases API
export const bookingsApi = {
  // Get all bookings with optional filters
  getBookings: async (
    params?: LeaseSearchParams
  ): Promise<PaginatedResponse<Booking>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<Booking>>('/bookings', {
        params,
      });
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },

  // Get a single booking by ID
  getBookingById: async (id: string): Promise<Booking> => {
    try {
      const response = await apiClient.get<Booking>(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },

  // Delete a booking
  deleteBooking: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/bookings/${id}`);
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },

  // Search bookings by query (ID, agreement number, email)
  searchBookings: async (
    query: string,
    params?: Omit<LeaseSearchParams, 'query'>
  ): Promise<PaginatedResponse<Booking>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<Booking>>('/bookings/search', {
        params: { query, ...params },
      });
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },

  // Run validation checks on bookings
  runChecks: async (bookingIds?: string[]): Promise<{ results: CheckResult[] }> => {
    try {
      const response = await apiClient.post<{ results: CheckResult[] }>('/bookings/run-checks', {
        bookingIds,
      });
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },
};

// Leases API
export const leasesApi = {
  // Get all leases
  getLeases: async (params?: LeaseSearchParams): Promise<PaginatedResponse<Lease>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<Lease>>('/leases', {
        params,
      });
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },

  // Get a single lease by ID
  getLeaseById: async (id: string): Promise<Lease> => {
    try {
      const response = await apiClient.get<Lease>(`/leases/${id}`);
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },

  // Get lease by unique ID or agreement number
  getLeaseByIdentifier: async (identifier: string): Promise<Lease> => {
    try {
      const response = await apiClient.get<Lease>(`/leases/find/${identifier}`);
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },

  // Update lease status
  updateLeaseStatus: async (id: string, status: string): Promise<Lease> => {
    try {
      const response = await apiClient.patch<Lease>(`/leases/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },

  // Get lease dropdown options
  getLeaseOptions: async (): Promise<LeaseOption[]> => {
    try {
      const response = await apiClient.get<LeaseOption[]>('/leases/options');
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },
};

// Pricing API
export const pricingApi = {
  // Update prices for a lease
  updatePrices: async (leaseId: string, pricing: PricingUpdate): Promise<Lease> => {
    try {
      const response = await apiClient.put<Lease>(`/leases/${leaseId}/pricing`, pricing);
      return response.data;
    } catch (error) {
      throw transformError(error as AxiosError<ApiError>);
    }
  },
};

// Types for API responses
export interface CheckResult {
  bookingId: string;
  passed: boolean;
  errors: string[];
  warnings: string[];
}

export interface LeaseOption {
  id: string;
  uniqueId: string;
  agreementNumber: string;
  listingName: string;
  displayLabel: string;
}

export interface PricingUpdate {
  baseNightlyRate?: number;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  cleaningFee?: number;
  serviceFee?: number;
}

export default apiClient;
