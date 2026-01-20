# Split Lease - Leases Overview Page

A React-based implementation of the Split Lease Leases Selection Dashboard, migrated from Bubble.io.

## Features

- **Leases List Display**: View all bookings/leases with comprehensive details
- **Search Functionality**: Search by lease ID, agreement number, guest email, or host email
- **Filter by Lease**: Dropdown selection to filter specific leases
- **Lease Management**: View details and delete bookings
- **Copy to Clipboard**: Quick copy of lease IDs
- **Validation Checks**: Run checks on lease data
- **Responsive Design**: Works on desktop, tablet, and mobile

## Project Structure

```
src/
├── components/
│   ├── shared/
│   │   ├── Header.tsx          # Corporate header component
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Alert.tsx           # Alert/notification system
│   │   └── ConfirmDialog.tsx   # Confirmation modal
│   ├── LeaseCard.tsx           # Individual lease card component
│   ├── SearchBox.tsx           # Search input component
│   ├── LeaseDropdown.tsx       # Lease filter dropdown
│   ├── LoadingSpinner.tsx      # Loading indicator
│   └── EmptyState.tsx          # Empty state display
├── pages/
│   └── LeasesOverviewPage.tsx  # Main page component
├── services/
│   ├── api.ts                  # API service layer
│   └── mockData.ts             # Mock data for development
├── types/
│   └── lease.types.ts          # TypeScript type definitions
├── hooks/
│   ├── useBookings.ts          # Bookings data management hook
│   └── useAlert.ts             # Alert/notification hook
├── utils/
│   ├── formatters.ts           # Date, currency, status formatters
│   └── clipboard.ts            # Clipboard utilities
├── styles/
│   └── index.css               # Global styles and CSS variables
├── App.tsx                     # Root application component
└── main.tsx                    # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/splitleasesharath/_leases-overview.git
cd _leases-overview

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
# Build for production
npm run build
# or
bun run build
```

## Data Model

### Booking
- Contains lease reference and booking status
- Linked to Lease entity

### Lease
- Core entity with agreement details
- Contains listing, proposal, stays references
- Tracks payment and document status

### Listing
- Property information with photos, features, amenities
- Pricing configuration

### Proposal
- Lease proposal with weekly schedule
- Contains drafts history

### Stay
- Individual stay records within a lease

## API Endpoints

The application is designed to work with the following API endpoints:

- `GET /bookings` - Fetch all bookings
- `GET /bookings/:id` - Get single booking
- `DELETE /bookings/:id` - Delete a booking
- `GET /bookings/search` - Search bookings
- `POST /bookings/run-checks` - Run validation checks
- `GET /leases` - Fetch all leases
- `GET /leases/options` - Get lease dropdown options

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=https://api.splitlease.com
VITE_API_VERSION=v1
VITE_ENABLE_MOCK_DATA=true
```

## Original Bubble.io Reference

This page was migrated from Bubble.io `_leases-overview` page with the following specifications:

- Page dimensions: 1600px width x 1655px height
- Fixed width layout with responsive breakpoints
- 10 frontend workflows
- Integration with backend workflows for lease management

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Axios** - HTTP client
- **date-fns** - Date formatting

## License

Proprietary - Split Lease Inc.
