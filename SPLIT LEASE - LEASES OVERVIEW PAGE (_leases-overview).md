SPLIT LEASE \- LEASES OVERVIEW PAGE (\_leases-overview)  
COMPREHENSIVE BUBBLE TO CODE MIGRATION REQUIREMENTS DOCUMENT

1\. PAGE OVERVIEW

Page Name: \_leases-overview  
Display Name: "Leases Selection Dashboard \- Version Test"  
Type: Standard web page (native app capable)  
Dimensions: 1600px width x 1655px height  
Fixed Width: Yes  
Responsiveness: Custom configuration with preset width  
Time Zone: User's current timezone  
Type of Content: List-based dashboard for lease/booking management  
Purpose: Displays a comprehensive list of bookings/leases associated with listings, allowing property managers to view, search, filter, and manage leases

2\. KEY PAGE ELEMENTS & STRUCTURE

A. PRIMARY HEADER (Floating Group: "\_Corporate Header A")  
\- Type: Reusable floating group component  
\- Dimensions: 1576px W x 82px H  
\- Position: Fixed at Top  
\- Z-Index: Above all other elements  
\- Visibility Conditional: Only visible when "Current date/time is not empty"  
\- Content: Navigation/branding header (appears to include corporate branding)

B. PAGE TITLE  
\- Text: "Leases Selection Dashboard \- Version Test"  
\- Purpose: Main page heading identifying the dashboard

C. REPEATING GROUP ("RG: Listings")  
\- Data Source: "Parent group's Bookings \- Leases's List of Bookings"  
\- Primary Query: Fetches all bookings associated with parent group's leases  
\- Display Type: Multi-row listing with 1+ lease record per row  
\- Key Data Points Per Row:  
  \* Listing Name/Title  
  \* Agreement Number  
  \* Lease ID  
  \* Listing Photo (thumbnail \- first image from listing's photos list, filtered)  
  \* Weekly Pattern Schedule Display  
  \* Is Usability Toggle/Indicator  
  \* Proposal Status Information  
  \* Action Buttons: Details, Delete  
  \* Stays Count and Drafts Count  
  \* Payment Status Information  
  \* Document Status Indicators

D. DROPDOWN \- "D: Choose Reservations/leases"  
\- Type: Single-select dropdown  
\- Placeholder Text: "Choose Lease"  
\- Initial Value: "Choose Lease"  
\- Purpose: Allows filtering/selecting specific leases from available list

E. SEARCH BOX ("G: Search Listing")  
\- Type: Input field with search functionality  
\- Placeholder Text: "Search Lease by using unique ID, agreement number, g\[uest email, host email\]"  
\- Read-only Attribute: Applied (data sourced from parent group)  
\- Purpose: Search/filter leases by ID, agreement number, or email addresses  
\- Clear Button: X icon to reset search

F. ACTION BUTTONS  
\- "Run Checks": Triggers validation/checking workflows  
\- "Change Prices": Navigation button (appears in header)  
\- "B: Delete": Delete booking button (appears per booking row)  
\- "Details" Button: Navigate to detailed lease view  
\- "B: Go to page \_manage-leases copy 2": Navigation button

3\. PAGE WORKFLOWS (FRONTEND)

Total Page Workflows: 10 (organized in categories)

A. COPY TO CLIPBOARD WORKFLOWS (1)  
  1\. "Text Lease ID: Parent gro is clicked"  
     \- Trigger: User clicks on Text element displaying Lease ID  
     \- Actions:  
       \* Copy data to clipboard from static text (copies lease ID)  
       \* AirAlert \- Standard (notification showing copy success)

B. CREATE/MODIFY/DELETE LISTING WORKFLOWS (1)  
  1\. "B: Delete is clicked \- Deletes Listing and Displays Alert"  
     \- Trigger: B: Delete Booking button clicked  
     \- Element: B: Delete Booking button  
     \- Actions:  
       \* Delete Bookings \- Leases from database  
       \* Display confirmation/completion alert  
       \* Related Backend Workflow Triggered

C. CUSTOM EVENTS (1)  
  \- One custom event configured (details to be expanded)

D. NAVIGATION WORKFLOWS (3)  
  \- Multiple navigation workflows for page transitions  
  \- Likely destinations: \_manage-leases copy 2, price management pages

E. ON PAGE LOAD WORKFLOWS (2)  
  \- Workflow 1: Initial data loading (fetch leases list)  
  \- Workflow 2: Setup/initialization workflow

F. RESET INPUT FIELD WORKFLOWS (1)  
  \- Workflow for clearing search inputs  
  \- Likely triggered by X button in search box

G. SHOW/HIDE ELEMENTS WORKFLOWS (1)  
  \- Conditional visibility management for page elements

4\. BACKEND WORKFLOWS (API WORKFLOWS)

Total Backend Workflows in App: 296 (across all pages)  
Workflows Used by This Page: Estimated 15-30 workflows

A. LEASES WORKFLOWS (11 workflows)  
  Purpose: Core lease management operations  
  Operations: Create, update, delete, retrieve lease records  
  Key Actions:  
    \- Fetch lease details and associated data  
    \- Update lease status (active, archived, etc.)  
    \- Manage lease dates and schedules  
    \- Handle lease transitions and status changes

B. LISTING WORKFLOWS (15 workflows)  
  Purpose: Manage listing data associated with leases  
  Operations: Fetch listing info, photos, features, pricing  
  Key Actions:  
    \- Retrieve listing details  
    \- Fetch listing images/photos  
    \- Get listing features and amenities  
    \- Update listing availability

C. DATA MANAGEMENT (5 workflows)  
  Purpose: Core data operations  
  Operations: Data validation, transformation, cleanup  
  Key Actions:  
    \- Validate incoming data  
    \- Transform data formats  
    \- Cleanup/archive old records

D. PROPOSAL WORKFLOWS (17 workflows)  
  Purpose: Manage lease proposals and negotiations  
  Key Actions:  
    \- Create proposals  
    \- Update proposal status  
    \- Track proposal timeline  
    \- Archive proposals

E. MESSAGING SYSTEM (52 workflows)  
  Purpose: Handle communications related to leases  
  Key Actions:  
    \- Send notifications  
    \- Store message history  
    \- Manage message templates  
    \- Track communication status

F. PRICE CALCULATIONS (15 workflows)  
  Purpose: Calculate rental prices, fees, splits  
  Key Actions:  
    \- Calculate nightly rates  
    \- Compute split lease pricing  
    \- Generate price breakdowns  
    \- Calculate fees and taxes

G. LISTING CURATION (3 workflows)  
  Purpose: Manage listing quality and presentation  
  Key Actions:  
    \- Validate listing completeness  
    \- Update listing status

H. DATE CHANGE REQUESTS (9 workflows)  
  Purpose: Handle date modification requests  
  Key Actions:  
    \- Process date change requests  
    \- Update booking calendars  
    \- Handle conflicts

I. CORE SYSTEMS  
  \- Core \- Notifications (1): Alert/notification dispatch  
  \- Core \- User Management (5): User access and permission handling  
  \- Code Based API Calls (14): External integrations  
  \- ChatGPT (7): AI-powered features

J. BULK OPERATIONS  
  \- Bulk Fix (48): Mass update operations  
  \- Masking & Forwarding (11): Email/communication masking  
  \- Masking and Forwarding (FRED) (4): Alternative masking system

K. SPECIALIZED WORKFLOWS  
  \- House Manual Visitors Handling (13): Visitor management  
  \- Emergency & Safety (2): Incident handling  
  \- Reservation Manage (2): Reservation operations  
  \- MAIN Reviews (2): Review management  
  \- Integrations & APIs (1): External system connections  
  \- Bots (2): Automated bot operations  
  \- Sales (1): Sales operations

5\. DATA MODEL & QUERIES

A. PRIMARY DATA SOURCES  
  1\. Bookings Type  
     \- Fields Used: unique\_id, Lease's (relationship)  
     \- Filters: Active leases only  
    
  2\. Leases Type  
     \- Fields Used: unique\_id, agreement number, status, dates  
     \- Related: Bookings (parent-child)  
     \- Related: Listing (listing\_id)  
     \- Related: Proposal (proposal\_id)  
    
  3\. Listing Type  
     \- Fields Used: name, address, photos, features, amenities, pricing  
     \- Related: Bookings (through Lease)  
     \- Related: Photos (images array)  
    
  4\. Proposal Type  
     \- Fields Used: status, hc\_weeks\_schedule, drafts\_list, stays  
     \- Related: Lease (lease\_id)

B. QUERY PATTERNS  
  1\. "Parent group's Bookings \- Leases's List of Bookings"  
     \- Data Path: Current Booking → Lease → Bookings List  
     \- Purpose: Fetch all bookings for a lease  
     \- Sorting: Unknown (default app sorting)  
     \- Filters: None visible (shows all)  
    
  2\. "Parent group's Bookings \- Leases's Listing's Features \- Photos:filtered:first item"  
     \- Data Path: Booking → Lease → Listing → Photos (filtered) → First  
     \- Purpose: Get primary listing photo  
     \- Filter: Photos list filtered (criteria unknown \- possibly only published/active)  
     \- Returns: First image object  
    
  3\. "Parent group's Bookings \- Leases's Proposal's hc weeks schedule"  
     \- Data Path: Booking → Lease → Proposal → hc\_weeks\_schedule  
     \- Purpose: Get weekly pattern/schedule display  
     \- Format: Display-formatted schedule  
    
  4\. "Parent group's Bookings \- Leases's Proposal's Drafts List:count"  
     \- Data Path: Booking → Lease → Proposal → Drafts → Count  
     \- Purpose: Get number of draft proposals  
     \- Format: Text formatted (displays count)  
    
  5\. "Parent group's Bookings \- Leases's List of Stays:count"  
     \- Data Path: Booking → Lease → Stays → Count  
     \- Purpose: Get number of stays associated with lease  
     \- Format: Text formatted

C. SECONDARY DATA OPERATIONS  
  \- Search: Filters leases by ID, agreement number, email  
  \- Selection: Dropdown allows choosing specific lease  
  \- Display: Conditional rendering based on data availability

6\. ELEMENT CONDITIONALS & VISIBILITY RULES

A. HEADER CONDITIONAL  
  Element: \_Corporate Header A  
  Condition: "Current date/time is not empty"  
  Action: Show element  
  Interpretation: Header is always shown (current date/time always exists)

B. REPEATING GROUP DISPLAY CONDITIONALS  
  Element: RG: Listings (Repeating Group)  
  Logic: Displays each booking item with conditional fields  
  Per-Row Conditionals (Inferred):  
    \- Photo Display: Filters photos list, shows first image or placeholder  
    \- Weekly Pattern: Displays if proposal exists and has schedule  
    \- Usability Toggle: Conditional display based on field value  
    \- Status Indicators: Conditional based on proposal/payment status  
    \- Counts: Conditional display of drafts and stays counts

C. FORM INPUT CONDITIONALS  
  Dropdown (D: Choose Reservations/leases):  
    \- Initial State: Shows "Choose Lease" placeholder  
    \- Conditional: May have visibility based on user permissions or data availability  
    
  Search Box (G: Search Listing):  
    \- Read-only: Cannot be edited directly  
    \- Conditional: May be disabled/enabled based on selection state  
    \- Clear Button: X icon visible when search has content

7\. STYLING & PRESENTATION

A. COLOR SCHEME  
  Primary Header: Blue background (RGB or HEX to be confirmed)  
  Background: White/Light gray  
  Text: Dark gray/black for readability  
  Accent Colors: Blue for buttons and interactive elements

B. TYPOGRAPHY  
  Page Title: Large, bold font  
  Section Headers: Bold, medium size  
  Body Text: Standard readable size  
  Placeholder Text: Light gray, italicized

C. LAYOUT  
  Fixed Width: 1600px  
  Header: Floating, fixed position at top  
  Main Content: Scrollable below header  
  Spacing: Standard Bubble spacing conventions  
  Buttons: Standard button styling with hover effects

D. RESPONSIVE BEHAVIOR  
  Mobile: May have alternative layout (Responsive tab in Bubble)  
  Tablet: Intermediate sizing  
  Desktop: Full 1600px width layout  
  Overflow: Vertical scrolling for large datasets

8\. KEY BUSINESS LOGIC & INTENTIONS

Based on Element and Workflow Naming Conventions:

A. PRIMARY PURPOSE: Lease Management Dashboard  
  \- View all active leases/bookings  
  \- Search and filter leases by multiple criteria  
  \- Quick access to lease details  
  \- Delete/manage bookings  
  \- View proposal and stay information

B. NAMING CONVENTION PATTERNS  
  T: \= Text elements  
  P: \= Panel/container elements  
  D: \= Dropdown/input elements  
  G: \= Group elements  
  B: \= Button elements  
  RG: \= Repeating Group (list)  
  ♻️ \= Reusable component  
  💥 \= Special/complex component  
    
C. WORKFLOW INTENTIONS (Inferred from Names)  
  "Copy to Clipboard" \= User convenience feature for sharing lease IDs  
  "Delete is clicked" \= Lease deletion workflow with confirmation  
  "Run Checks" \= Data validation/integrity checks  
  "Navigation" \= Page routing to related pages (manage leases, pricing)  
  "On Page Load" \= Initial data fetching and setup  
  "Reset Input Field" \= Clear search to show all leases again  
  "Show/Hide Elements" \= Dynamic UI visibility based on state

D. EXPECTED USER FLOWS  
  1\. Load page → Fetch all leases for current user  
  2\. Search/filter leases using dropdown or search box  
  3\. View lease details including proposal status and stays  
  4\. Click "Details" to navigate to lease detail page  
  5\. Delete booking with confirmation  
  6\. Copy lease ID for communication purposes  
  7\. Navigate to manage leases page for more options

9\. CRITICAL UNKNOWNS & ITEMS REQUIRING FURTHER INVESTIGATION

These items were not fully visible in the Bubble editor and require additional exploration:

A. EXACT QUERY FILTERS & SORTING  
  ? What specific filters are applied to the "Photos" list when displaying listing images?  
  ? What is the default sorting order for leases in the repeating group?  
  ? Are there hidden filters for status, date range, or owner?  
  ? How are deleted bookings handled \- hard delete or soft delete (status flag)?

B. DROPDOWN FUNCTIONALITY DETAILS  
  ? What data source populates the "Choose Lease" dropdown?  
  ? Are dropdown options filtered by current user, property, or location?  
  ? What happens when dropdown selection changes \- does it filter the repeating group?  
  ? Are there cascading filters between dropdown and search box?

C. SEARCH BOX IMPLEMENTATION  
  ? What exact fields does the search function check (unique\_id, agreement\_number, guest\_email, host\_email)?  
  ? Is search real-time or does it require form submission?  
  ? Is search case-sensitive?  
  ? Does it support partial matches or require exact matches?  
  ? What is the backend API call for search functionality?

D. CONDITIONAL VISIBILITY LOGIC  
  ? What specific conditions determine visibility of individual columns/data fields?  
  ? Are there permission-based conditionals that hide/show fields for different user roles?  
  ? What determines when the "Is Usability?" toggle is displayed vs hidden?  
  ? Are there date-based conditionals for showing lease details?

E. COMPLEX EXPRESSIONS  
  ? What is the exact logic for calculating "Weekly pattern is \[X weeks schedule's Display\]"?  
  ? How is "hc\_weeks\_schedule" formatted and what does it represent?  
  ? What transformations are applied to the photo data before display?  
  ? Are there custom formatting functions used for displaying counts and dates?

F. BACKEND WORKFLOW DETAILS  
  ? Which of the 296 backend workflows are actually triggered by this page?  
  ? What data validation occurs in the "Run Checks" button workflow?  
  ? Are there scheduled workflows that run periodically?  
  ? What error handling and retry logic exists?  
  ? How are failed delete operations handled?

G. EXTERNAL INTEGRATIONS  
  ? Are there integrations with email services for notifications?  
  ? Is there integration with calendar/scheduling systems?  
  ? Are there webhook calls to external systems?  
  ? What third-party APIs are called (ChatGPT, etc.)?

H. PERFORMANCE & OPTIMIZATION  
  ? What is the pagination/lazy loading strategy for large lease lists?  
  ? Are there caching mechanisms?  
  ? What is the maximum number of leases that can be displayed?  
  ? Are there performance optimizations for the repeating group?

I. MOBILE RESPONSIVENESS  
  ? What does the mobile layout look like (configured in Responsive tab)?  
  ? How are buttons and text truncated on smaller screens?  
  ? Are there mobile-specific workflows or conditionals?

J. ERROR HANDLING & EDGE CASES  
  ? What happens if a lease has no associated listing?  
  ? What happens if a lease has no proposal?  
  ? What is the behavior when database queries return empty results?  
  ? How are API errors displayed to users?

K. STYLING DETAILS  
  ? Exact color values (hex/RGB) for all UI elements  
  ? Font families and sizes for all text elements  
  ? Border styles, shadows, and other CSS properties  
  ? Responsive breakpoints and media queries

L. STATE MANAGEMENT  
  ? What data is stored in browser local state vs server state?  
  ? Are there URL parameters that affect page behavior?  
  ? How is scroll position managed?  
  ? Are there session variables used?

10\. FURTHER INVESTIGATION INSTRUCTIONS FOR NEXT PASS

To complete the requirements document, a follow-up analysis session should:

A. DEEP DIVE INTO WORKFLOWS  
   \[ \] Open each workflow in the Workflow tab and document:  
       \- Exact trigger conditions  
       \- All actions taken (with parameters)  
       \- Conditional logic within workflow steps  
       \- API calls made  
       \- Error handling paths  
   \[ \] For each backend workflow category, identify which ones are called by this page  
   \[ \] Document workflow execution order and dependencies

B. QUERY INSPECTION  
   \[ \] Click on repeating group and document exact data source query  
   \[ \] Check for any dynamic filters or constraints  
   \[ \] Verify sorting order (via element settings)  
   \[ \] Document any pagination settings  
   \[ \] Check if search/filter modifies the base query

C. CONDITIONAL ANALYSIS  
   \[ \] For each element with conditionals, document:  
       \- Exact condition expression  
       \- What property is being affected (visibility, disabled, etc.)  
       \- Which elements depend on which conditionals  
   \[ \] Look for hidden conditionals that might not be immediately visible  
   \[ \] Check styling tab for style conditionals

D. RESPONSIVE DESIGN DETAILS  
   \[ \] Click "Responsive" tab and document:  
       \- Breakpoint definitions  
       \- Element behavior at each breakpoint  
       \- Mobile layout structure  
       \- Tablet layout structure  
   \[ \] Screenshot layouts at different screen sizes

E. STYLING & CSS  
   \[ \] Access Styles tab and document:  
       \- Custom CSS if any  
       \- Theme colors used  
       \- Font styling  
       \- Spacing and sizing system  
   \[ \] Note any inherited styles from reusable components

F. PLUGIN INVESTIGATION  
   \[ \] Check Plugins tab for:  
       \- Third-party plugins used  
       \- Plugin configurations  
       \- Plugin-specific workflows

G. DATABASE SCHEMA  
   \[ \] Go to Data tab and document:  
       \- Exact field definitions for Bookings, Leases, Listings, Proposals  
       \- Field types and constraints  
       \- Relationship definitions  
       \- Default values

H. PREVIEW TESTING  
   \[ \] Test page behavior by:  
       \- Entering various search terms  
       \- Using dropdown filters  
       \- Scrolling through large result sets  
       \- Clicking all buttons and observing behavior  
       \- Testing on mobile/tablet views  
       \- Checking error states (invalid input, etc.)

I. PERFORMANCE PROFILING  
   \[ \] Use browser DevTools to analyze:  
       \- Initial page load time  
       \- Data fetch times  
       \- Search/filter response times  
       \- Network calls and their payloads

J. SECURITY & PERMISSIONS  
   \[ \] Verify:  
       \- User role-based access control  
       \- Data privacy constraints  
       \- API authentication requirements

K. API DOCUMENTATION  
   \[ \] If using Bubble's API connector:  
       \- Document all custom API endpoints  
       \- Document request/response formats  
       \- Document authentication requirements

L. COMMENTS & NOTES  
   \[ \] Check for comments in element settings or workflows  
   \[ \] Document any known issues or technical debt

11\. ESTIMATED COMPLEXITY ASSESSMENT

Technical Complexity: MEDIUM-HIGH  
  \- Moderate number of elements (10-15 primary)  
  \- Complex data relationships and queries  
  \- 10 frontend workflows  
  \- 50+ backend workflows potentially involved  
  \- Conditional logic throughout  
  \- Real-time search/filtering  
  \- Repeating group with dynamic content  
    
Migration Effort Estimate: 40-80 hours  
  \- Data model definition: 8-12 hours  
  \- UI/Component implementation: 12-16 hours  
  \- Frontend logic/workflows: 8-12 hours  
  \- Backend API implementation: 12-20 hours  
  \- Testing and refinement: 8-12 hours  
  \- Buffer for unknowns: 20-30%

Recommended Technology Stack:  
  Frontend: React, Vue, or Svelte (component-based)  
  Backend: Node.js/Express, Python/FastAPI, or Go  
  Database: PostgreSQL or MongoDB (depending on existing schema)  
  Search: Elasticsearch or built-in database search  
  UI Component Library: Material-UI, Ant Design, or custom

12\. DOCUMENT SUMMARY

This requirements document provides a comprehensive analysis of the Split Lease "\_leases-overview" page as extracted from the Bubble IDE. The page is a lease management dashboard with moderate-to-high technical complexity.

KEY FINDINGS:

✓ Page Purpose: Centralized lease/booking list view with search, filter, and management capabilities  
✓ Primary Elements: 1 floating header \+ 1 repeating group \+ dropdown \+ search box \+ multiple action buttons  
✓ Frontend Workflows: 10 distinct workflows covering navigation, data manipulation, and UI control  
✓ Backend System: Extensive (296 total workflows) with deep integration into leases, listings, proposals, pricing, and messaging  
✓ Data Model: Complex multi-level relationships (Bookings → Leases → Listings, Proposals, Stays)  
✓ Key Features: Real-time search, lease filtering, quick details access, lease deletion, ID copying

CRITICAL SUCCESS FACTORS FOR MIGRATION:  
1\. Accurate data model replication (especially relationship mappings)  
2\. Proper implementation of complex query logic (nested data access patterns)  
3\. Faithful recreation of all 10 frontend workflows  
4\. Comprehensive backend API design to replace Bubble backend workflows  
5\. Proper error handling and edge case coverage  
6\. Performance optimization for large datasets  
7\. Responsive design across all device sizes

RECOMMENDED NEXT STEPS:  
1\. Schedule a "Deep Dive" session using this document as a checklist  
2\. Complete all items in Section 10 (Further Investigation Instructions)  
3\. Create detailed UI wireframes/mockups  
4\. Document the exact database schema from Bubble's Data tab  
5\. Create API specifications for all backend operations  
6\. Begin with data model and API implementation  
7\. Implement frontend components incrementally with testing at each stage

\--- END OF DOCUMENT \---

Document Created: January 13, 2025  
Analysis Scope: Bubble IDE \- \_leases-overview page (Design, Workflow, Backend Workflows tabs)  
Status: FIRST PASS \- Requires follow-up deep dive  
Confidence Level: 75% (See Section 9 for unknowns)

