import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

// Date Formatting
export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid Date';
  return format(dateObj, 'MMM d, yyyy');
};

export const formatDateTime = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid Date';
  return format(dateObj, 'MMM d, yyyy h:mm a');
};

export const formatDateRange = (
  startDate: Date | string | undefined,
  endDate: Date | string | undefined
): string => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

export const formatRelativeTime = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid Date';
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

// Currency Formatting
export const formatCurrency = (
  amount: number,
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Status Formatting
export const formatLeaseStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed',
    terminated: 'Terminated',
    expired: 'Expired',
    draft: 'Draft',
  };
  return statusMap[status] || status;
};

export const formatPaymentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    paid: 'Paid',
    partial: 'Partial',
    pending: 'Pending',
    overdue: 'Overdue',
    refunded: 'Refunded',
  };
  return statusMap[status] || status;
};

export const formatDocumentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    complete: 'Complete',
    pending: 'Pending',
    missing: 'Missing',
    expired: 'Expired',
  };
  return statusMap[status] || status;
};

export const formatProposalStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
    expired: 'Expired',
    countered: 'Countered',
    draft: 'Draft',
  };
  return statusMap[status] || status;
};

export const formatBookingStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    confirmed: 'Confirmed',
    pending: 'Pending',
    cancelled: 'Cancelled',
    completed: 'Completed',
  };
  return statusMap[status] || status;
};

// ID Formatting
export const truncateId = (id: string, maxLength: number = 12): string => {
  if (id.length <= maxLength) return id;
  return `${id.substring(0, maxLength)}...`;
};

// Email Masking
export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (!domain) return email;
  const maskedLocal =
    localPart.length > 2
      ? `${localPart[0]}***${localPart[localPart.length - 1]}`
      : `${localPart[0]}***`;
  return `${maskedLocal}@${domain}`;
};

// Count Formatting
export const formatCount = (count: number, singular: string, plural?: string): string => {
  const pluralForm = plural || `${singular}s`;
  return `${count} ${count === 1 ? singular : pluralForm}`;
};

// Address Formatting
export const formatAddress = (
  address: string,
  city: string,
  state: string,
  zipCode?: string
): string => {
  const parts = [address, city, state];
  if (zipCode) parts.push(zipCode);
  return parts.filter(Boolean).join(', ');
};

// Percentage Formatting
export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

// Payment Progress
export const calculatePaymentProgress = (
  paidAmount: number,
  totalAmount: number
): number => {
  if (totalAmount === 0) return 0;
  return Math.min(100, Math.round((paidAmount / totalAmount) * 100));
};
