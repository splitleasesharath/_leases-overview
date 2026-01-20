import React, { useState } from 'react';
import type { Booking } from '../types';
import {
  formatDate,
  formatDateRange,
  formatCurrency,
  formatLeaseStatus,
  formatPaymentStatus,
  formatDocumentStatus,
  formatProposalStatus,
  formatCount,
  calculatePaymentProgress,
  truncateId,
} from '../utils/formatters';
import { copyToClipboard } from '../utils/clipboard';
import './LeaseCard.css';

interface LeaseCardProps {
  booking: Booking;
  onDelete: (id: string) => void;
  onViewDetails: (leaseId: string) => void;
  onCopyId: (id: string) => void;
}

const LeaseCard: React.FC<LeaseCardProps> = ({
  booking,
  onDelete,
  onViewDetails,
  onCopyId,
}) => {
  const { lease } = booking;
  const [isIdCopied, setIsIdCopied] = useState(false);

  // Get first published photo or placeholder
  const listingPhoto = lease.listing.photos.find((p) => p.isPublished)?.thumbnailUrl ||
    lease.listing.photos[0]?.thumbnailUrl ||
    '/placeholder-listing.jpg';

  const handleCopyLeaseId = async () => {
    const success = await copyToClipboard(lease.uniqueId);
    if (success) {
      setIsIdCopied(true);
      onCopyId(lease.uniqueId);
      setTimeout(() => setIsIdCopied(false), 2000);
    }
  };

  const paymentProgress = calculatePaymentProgress(lease.paidAmount, lease.totalAmount);

  // Status badge color mapping
  const getStatusClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      active: 'status-active',
      pending: 'status-pending',
      completed: 'status-completed',
      terminated: 'status-terminated',
      expired: 'status-expired',
      draft: 'status-draft',
    };
    return statusClasses[status] || 'status-default';
  };

  const getPaymentStatusClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      paid: 'payment-paid',
      partial: 'payment-partial',
      pending: 'payment-pending',
      overdue: 'payment-overdue',
      refunded: 'payment-refunded',
    };
    return statusClasses[status] || 'payment-default';
  };

  const getDocumentStatusClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      complete: 'doc-complete',
      pending: 'doc-pending',
      missing: 'doc-missing',
      expired: 'doc-expired',
    };
    return statusClasses[status] || 'doc-default';
  };

  return (
    <div className="lease-card">
      {/* Photo Section */}
      <div className="lease-card-photo">
        <img
          src={listingPhoto}
          alt={lease.listing.name}
          className="listing-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/120x80?text=No+Image';
          }}
        />
      </div>

      {/* Main Info Section */}
      <div className="lease-card-info">
        <div className="lease-card-header">
          <h3 className="listing-name">{lease.listing.name}</h3>
          <span className={`status-badge ${getStatusClass(lease.status)}`}>
            {formatLeaseStatus(lease.status)}
          </span>
        </div>

        <div className="lease-card-details">
          {/* IDs Row */}
          <div className="details-row">
            <div className="detail-item">
              <span className="detail-label">Lease ID:</span>
              <span
                className="detail-value lease-id clickable"
                onClick={handleCopyLeaseId}
                title="Click to copy"
              >
                {truncateId(lease.uniqueId, 18)}
                <span className={`copy-indicator ${isIdCopied ? 'show' : ''}`}>
                  Copied!
                </span>
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Agreement #:</span>
              <span className="detail-value">{lease.agreementNumber}</span>
            </div>
          </div>

          {/* Date Range */}
          <div className="details-row">
            <div className="detail-item">
              <span className="detail-label">Period:</span>
              <span className="detail-value">
                {formatDateRange(lease.startDate, lease.endDate)}
              </span>
            </div>
          </div>

          {/* Weekly Pattern */}
          {lease.proposal?.hcWeeksSchedule && (
            <div className="details-row">
              <div className="detail-item">
                <span className="detail-label">Weekly Pattern:</span>
                <span className="detail-value schedule">
                  {lease.proposal.hcWeeksSchedule}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Indicators Section */}
      <div className="lease-card-status">
        {/* Proposal Status */}
        {lease.proposal && (
          <div className="status-item">
            <span className="status-label">Proposal</span>
            <span className={`status-value ${getStatusClass(lease.proposal.status)}`}>
              {formatProposalStatus(lease.proposal.status)}
            </span>
          </div>
        )}

        {/* Payment Status */}
        <div className="status-item">
          <span className="status-label">Payment</span>
          <span className={`status-value ${getPaymentStatusClass(lease.paymentStatus)}`}>
            {formatPaymentStatus(lease.paymentStatus)}
          </span>
          <div className="payment-progress">
            <div
              className="payment-progress-bar"
              style={{ width: `${paymentProgress}%` }}
            />
          </div>
          <span className="payment-amount">
            {formatCurrency(lease.paidAmount)} / {formatCurrency(lease.totalAmount)}
          </span>
        </div>

        {/* Document Status */}
        <div className="status-item">
          <span className="status-label">Documents</span>
          <span className={`status-value ${getDocumentStatusClass(lease.documentStatus)}`}>
            {formatDocumentStatus(lease.documentStatus)}
          </span>
        </div>
      </div>

      {/* Counts Section */}
      <div className="lease-card-counts">
        <div className="count-item">
          <span className="count-value">{lease.stays.length}</span>
          <span className="count-label">{formatCount(lease.stays.length, 'Stay', 'Stays').split(' ')[1]}</span>
        </div>
        {lease.proposal && (
          <div className="count-item">
            <span className="count-value">{lease.proposal.draftsList.length}</span>
            <span className="count-label">{formatCount(lease.proposal.draftsList.length, 'Draft', 'Drafts').split(' ')[1]}</span>
          </div>
        )}
        {lease.isUsability && (
          <div className="usability-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Usability</span>
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div className="lease-card-actions">
        <button
          className="btn btn-primary"
          onClick={() => onViewDetails(lease.id)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Details
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(booking.id)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default LeaseCard;
