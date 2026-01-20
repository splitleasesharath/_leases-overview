import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Booking, LeaseSearchParams, ApiError } from '../types';
import { mockBookings } from '../services/mockData';

interface UseBookingsOptions {
  initialParams?: LeaseSearchParams;
  enableMockData?: boolean;
}

interface UseBookingsReturn {
  bookings: Booking[];
  isLoading: boolean;
  error: ApiError | null;
  searchQuery: string;
  selectedLeaseFilter: string;
  setSearchQuery: (query: string) => void;
  setSelectedLeaseFilter: (leaseId: string) => void;
  deleteBooking: (id: string) => Promise<void>;
  refreshBookings: () => Promise<void>;
  filteredBookings: Booking[];
}

export const useBookings = (options: UseBookingsOptions = {}): UseBookingsReturn => {
  const { enableMockData = true } = options;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeaseFilter, setSelectedLeaseFilter] = useState('');

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use mock data for development
      if (enableMockData) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBookings(mockBookings);
      } else {
        // TODO: Implement actual API call
        // const response = await bookingsApi.getBookings(params);
        // setBookings(response.data);
        setBookings(mockBookings);
      }
    } catch (err) {
      setError({
        code: 'FETCH_ERROR',
        message: 'Failed to fetch bookings',
      });
    } finally {
      setIsLoading(false);
    }
  }, [enableMockData]);

  // Initial fetch
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Delete booking
  const deleteBooking = useCallback(async (id: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (err) {
      setError({
        code: 'DELETE_ERROR',
        message: 'Failed to delete booking',
      });
      throw err;
    }
  }, []);

  // Refresh bookings
  const refreshBookings = useCallback(async () => {
    await fetchBookings();
  }, [fetchBookings]);

  // Filter bookings based on search query and selected lease
  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((booking) => {
        const lease = booking.lease;
        return (
          booking.uniqueId.toLowerCase().includes(query) ||
          lease.uniqueId.toLowerCase().includes(query) ||
          lease.agreementNumber.toLowerCase().includes(query) ||
          lease.guestEmail.toLowerCase().includes(query) ||
          lease.hostEmail.toLowerCase().includes(query) ||
          lease.listing.name.toLowerCase().includes(query)
        );
      });
    }

    // Filter by selected lease
    if (selectedLeaseFilter) {
      result = result.filter(
        (booking) =>
          booking.lease.id === selectedLeaseFilter ||
          booking.lease.uniqueId === selectedLeaseFilter
      );
    }

    return result;
  }, [bookings, searchQuery, selectedLeaseFilter]);

  return {
    bookings,
    isLoading,
    error,
    searchQuery,
    selectedLeaseFilter,
    setSearchQuery,
    setSelectedLeaseFilter,
    deleteBooking,
    refreshBookings,
    filteredBookings,
  };
};

export default useBookings;
