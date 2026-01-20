import React from 'react';
import './Header.css';

interface HeaderProps {
  onChangePrices?: () => void;
  onNavigateToManageLeases?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onChangePrices,
  onNavigateToManageLeases,
}) => {
  return (
    <header className="corporate-header">
      <div className="header-container">
        <div className="header-left">
          <a href="/" className="logo-link">
            <div className="logo">
              <span className="logo-text">Split</span>
              <span className="logo-dot">.</span>
              <span className="logo-text-secondary">lease</span>
            </div>
          </a>
        </div>

        <nav className="header-nav">
          <a href="/dashboard" className="nav-link">
            Dashboard
          </a>
          <a href="/listings" className="nav-link">
            Listings
          </a>
          <a href="/leases" className="nav-link active">
            Leases
          </a>
          <a href="/messages" className="nav-link">
            Messages
          </a>
        </nav>

        <div className="header-right">
          <div className="header-actions">
            {onChangePrices && (
              <button
                className="header-btn header-btn-secondary"
                onClick={onChangePrices}
              >
                Change Prices
              </button>
            )}
            {onNavigateToManageLeases && (
              <button
                className="header-btn header-btn-primary"
                onClick={onNavigateToManageLeases}
              >
                Manage Leases
              </button>
            )}
          </div>

          <div className="user-menu">
            <button className="user-menu-btn">
              <div className="user-avatar">
                <span className="user-initials">SL</span>
              </div>
              <svg
                className="dropdown-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
