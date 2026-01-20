import React, { useState, useRef, useEffect } from 'react';
import type { LeaseOption } from '../services/api';
import './LeaseDropdown.css';

interface LeaseDropdownProps {
  options: LeaseOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const LeaseDropdown: React.FC<LeaseDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Choose Lease',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find selected option label
  const selectedOption = options.find((opt) => opt.id === value || opt.uniqueId === value);
  const displayValue = selectedOption?.displayLabel || placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={`lease-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={`dropdown-value ${!selectedOption ? 'placeholder' : ''}`}>
          {displayValue}
        </span>
        <div className="dropdown-icons">
          {value && (
            <span
              className="dropdown-clear"
              onClick={handleClear}
              role="button"
              aria-label="Clear selection"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </span>
          )}
          <svg
            className="dropdown-arrow"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="listbox">
          <div
            className={`dropdown-option ${!value ? 'selected' : ''}`}
            onClick={() => handleSelect('')}
            role="option"
            aria-selected={!value}
          >
            <span className="option-label">{placeholder}</span>
            <span className="option-sublabel">Show all leases</span>
          </div>
          {options.map((option) => (
            <div
              key={option.id}
              className={`dropdown-option ${value === option.id || value === option.uniqueId ? 'selected' : ''}`}
              onClick={() => handleSelect(option.id)}
              role="option"
              aria-selected={value === option.id || value === option.uniqueId}
            >
              <span className="option-label">{option.agreementNumber}</span>
              <span className="option-sublabel">{option.listingName}</span>
            </div>
          ))}
          {options.length === 0 && (
            <div className="dropdown-empty">
              No leases available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeaseDropdown;
