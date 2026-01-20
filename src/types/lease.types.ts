// Lease Types - Split Lease Application
// Based on Bubble.io data model for _leases-overview page

export interface Photo {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
}

export interface Feature {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface Listing {
  id: string;
  uniqueId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  description?: string;
  photos: Photo[];
  features: Feature[];
  amenities: Amenity[];
  pricing: ListingPricing;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingPricing {
  baseNightlyRate: number;
  weeklyDiscount?: number;
  monthlyDiscount?: number;
  cleaningFee?: number;
  serviceFee?: number;
  currency: string;
}

export interface WeekSchedule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  isAvailable: boolean;
}

export interface Proposal {
  id: string;
  uniqueId: string;
  status: ProposalStatus;
  hcWeeksSchedule: string; // Display formatted schedule
  weekSchedules: WeekSchedule[];
  draftsList: ProposalDraft[];
  totalPrice?: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface ProposalDraft {
  id: string;
  version: number;
  changes: string;
  createdAt: Date;
  createdBy: string;
}

export type ProposalStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'expired'
  | 'countered'
  | 'draft';

export interface Stay {
  id: string;
  uniqueId: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestCount: number;
  status: StayStatus;
  totalAmount: number;
  createdAt: Date;
}

export type StayStatus =
  | 'upcoming'
  | 'active'
  | 'completed'
  | 'cancelled';

export interface Lease {
  id: string;
  uniqueId: string;
  agreementNumber: string;
  status: LeaseStatus;
  startDate: Date;
  endDate: Date;
  listing: Listing;
  proposal?: Proposal;
  stays: Stay[];
  guestEmail: string;
  hostEmail: string;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  documentStatus: DocumentStatus;
  isUsability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type LeaseStatus =
  | 'active'
  | 'pending'
  | 'completed'
  | 'terminated'
  | 'expired'
  | 'draft';

export type PaymentStatus =
  | 'paid'
  | 'partial'
  | 'pending'
  | 'overdue'
  | 'refunded';

export type DocumentStatus =
  | 'complete'
  | 'pending'
  | 'missing'
  | 'expired';

export interface Booking {
  id: string;
  uniqueId: string;
  lease: Lease;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus =
  | 'confirmed'
  | 'pending'
  | 'cancelled'
  | 'completed';

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

// Filter and Search Types
export interface LeaseSearchParams {
  query?: string; // Search by ID, agreement number, email
  status?: LeaseStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface LeaseFilterOptions {
  statuses: LeaseStatus[];
  paymentStatuses: PaymentStatus[];
  documentStatuses: DocumentStatus[];
}

// UI State Types
export interface LeaseListState {
  bookings: Booking[];
  selectedLeaseId: string | null;
  searchQuery: string;
  filters: LeaseSearchParams;
  isLoading: boolean;
  error: ApiError | null;
}

// Action Types for state management
export type LeaseAction =
  | { type: 'SET_BOOKINGS'; payload: Booking[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: ApiError | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_LEASE'; payload: string | null }
  | { type: 'UPDATE_FILTERS'; payload: Partial<LeaseSearchParams> }
  | { type: 'DELETE_BOOKING'; payload: string }
  | { type: 'RESET_FILTERS' };
