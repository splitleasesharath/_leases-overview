import React, { useState, useCallback } from 'react';
import {
  Header,
  Footer,
  AlertContainer,
  ConfirmDialog,
  LeaseCard,
  SearchBox,
  LeaseDropdown,
  LoadingSpinner,
  EmptyState,
} from '../components';
import { useBookings, useAlert } from '../hooks';
import { mockLeaseOptions } from '../services/mockData';
import './LeasesOverviewPage.css';

const LeasesOverviewPage: React.FC = () => {
  const {
    filteredBookings,
    isLoading,
    error,
    searchQuery,
    selectedLeaseFilter,
    setSearchQuery,
    setSelectedLeaseFilter,
    deleteBooking,
    refreshBookings,
  } = useBookings({ enableMockData: true });

  const { alerts, showAlert, hideAlert } = useAlert();

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle copy lease ID
  const handleCopyId = useCallback(
    (id: string) => {
      showAlert('success', `Lease ID "${id}" copied to clipboard!`);
    },
    [showAlert]
  );

  // Handle view details
  const handleViewDetails = useCallback((leaseId: string) => {
    // Navigate to lease details page
    window.location.href = `/manage-leases/${leaseId}`;
  }, []);

  // Handle delete button click
  const handleDeleteClick = useCallback((bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteDialogOpen(true);
  }, []);

  // Confirm delete
  const handleConfirmDelete = useCallback(async () => {
    if (!bookingToDelete) return;

    setIsDeleting(true);
    try {
      await deleteBooking(bookingToDelete);
      showAlert('success', 'Booking deleted successfully');
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
    } catch {
      showAlert('error', 'Failed to delete booking. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }, [bookingToDelete, deleteBooking, showAlert]);

  // Cancel delete
  const handleCancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  }, []);

  // Handle run checks
  const handleRunChecks = useCallback(async () => {
    showAlert('info', 'Running validation checks...');
    // Simulate check operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    showAlert('success', 'All checks completed successfully!');
  }, [showAlert]);

  // Handle change prices navigation
  const handleChangePrices = useCallback(() => {
    window.location.href = '/pricing';
  }, []);

  // Handle manage leases navigation
  const handleNavigateToManageLeases = useCallback(() => {
    window.location.href = '/manage-leases';
  }, []);

  // Clear filters
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedLeaseFilter('');
  }, [setSearchQuery, setSelectedLeaseFilter]);

  return (
    <div className="leases-overview-page">
      <Header
        onChangePrices={handleChangePrices}
        onNavigateToManageLeases={handleNavigateToManageLeases}
      />

      <main className="page-content">
        <div className="page-container">
          {/* Page Title */}
          <div className="page-header">
            <h1 className="page-title">Leases Selection Dashboard - Version Test</h1>
            <button className="btn-run-checks" onClick={handleRunChecks}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Run Checks
            </button>
          </div>

          {/* Filters Section */}
          <div className="filters-section">
            <LeaseDropdown
              options={mockLeaseOptions}
              value={selectedLeaseFilter}
              onChange={setSelectedLeaseFilter}
              placeholder="Choose Lease"
            />
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Lease by using unique ID, agreement number, guest email, host email"
            />
          </div>

          {/* Results Count */}
          {!isLoading && !error && (
            <div className="results-info">
              <span className="results-count">
                {filteredBookings.length} {filteredBookings.length === 1 ? 'lease' : 'leases'} found
              </span>
              {(searchQuery || selectedLeaseFilter) && (
                <button className="btn-clear-filters" onClick={handleClearFilters}>
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Leases List */}
          <div className="leases-list">
            {isLoading && (
              <LoadingSpinner size="large" message="Loading leases..." />
            )}

            {error && (
              <EmptyState
                title="Error loading leases"
                description={error.message}
                icon="error"
                actionLabel="Try again"
                onAction={refreshBookings}
              />
            )}

            {!isLoading && !error && filteredBookings.length === 0 && (
              <EmptyState
                title="No leases found"
                description={
                  searchQuery || selectedLeaseFilter
                    ? 'Try adjusting your search or filters to find what you\'re looking for.'
                    : 'There are no leases to display at the moment.'
                }
                icon={searchQuery || selectedLeaseFilter ? 'search' : 'lease'}
                actionLabel={searchQuery || selectedLeaseFilter ? 'Clear filters' : undefined}
                onAction={searchQuery || selectedLeaseFilter ? handleClearFilters : undefined}
              />
            )}

            {!isLoading &&
              !error &&
              filteredBookings.map((booking) => (
                <LeaseCard
                  key={booking.id}
                  booking={booking}
                  onDelete={handleDeleteClick}
                  onViewDetails={handleViewDetails}
                  onCopyId={handleCopyId}
                />
              ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Alerts */}
      <AlertContainer alerts={alerts} onClose={hideAlert} />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default LeasesOverviewPage;
