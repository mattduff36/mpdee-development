# Task List: Revamp Website Service Packages

*Generated from: `prd-services-revamp.md`*

## Relevant Files

- `src/components/Services.tsx` - Main services component containing the service packages array and modal logic
- `src/components/Services.test.tsx` - Unit tests for Services component
- `src/components/ServiceCard.tsx` - Individual service card component that may need updates for new package structure
- `src/components/ServiceCard.test.tsx` - Unit tests for ServiceCard component
- `src/components/ServiceModal.tsx` - Service modal component for detailed package views
- `src/components/ServiceModal.test.tsx` - Unit tests for ServiceModal component
- `src/components/icons/index.tsx` - Icon components for the new Bronze, Silver, Gold, Platinum packages
- `src/types/index.ts` - TypeScript interfaces for Service type definitions

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Focus on the website packages only - PWA and Media Partnership services remain unchanged

## Tasks

- [x] 1.0 Update Service Package Data Structure
  - [x] 1.1 Replace current 3 website packages with 4 new packages in the services array
  - [x] 1.2 Create Bronze package with 1-2 page basic holding page, starting at £100
  - [x] 1.3 Update Silver package (was "Essential") with 3 months support, starting at £300
  - [x] 1.4 Update Gold package (was "Business") with 6 months support, starting at £550, mark as "Most Popular"
  - [x] 1.5 Update Platinum package (was "Premium") with 12 months support, "Contact for price"
  - [x] 1.6 Add hosting information to all packages: "12 months hosting free, then £10/month billed annually"
  - [x] 1.7 Ensure PWA and Media Partnership services remain unchanged

- [x] 2.0 Create Professional Package Icons
  - [x] 2.1 Design or source professional SVG icons for Bronze package (avoid emojis)
  - [x] 2.2 Design or source professional SVG icons for Silver package (avoid emojis)
  - [x] 2.3 Design or source professional SVG icons for Gold package (avoid emojis)
  - [x] 2.4 Design or source professional SVG icons for Platinum package (avoid emojis)
  - [x] 2.5 Update icon imports and exports in `src/components/icons/index.tsx`
  - [x] 2.6 Ensure icons are accessible with proper ARIA labels

- [x] 3.0 Implement Package Pricing and Highlights
  - [x] 3.1 Add pricing display logic to show prices only in modal/details view (not main cards)
  - [x] 3.2 Implement "Most Popular" badge/highlight for Gold package
  - [x] 3.3 Update pricing display styling to match current design system
  - [x] 3.4 Ensure Platinum package shows "Please contact for price" instead of fixed pricing
  - [x] 3.5 Add visual differentiation between package tiers (colors, styling)

- [x] 4.0 Update Service Modal Content and Formatting
  - [x] 4.1 Update modal content to display new package features and benefits
  - [x] 4.2 Ensure hosting information is prominently displayed in each modal
  - [x] 4.3 Update support duration information (3, 6, 12 months) in modal details
  - [x] 4.4 Maintain current modal structure and formatting consistency
  - [x] 4.5 Update modal accessibility features (keyboard navigation, ARIA labels)
  - [x] 4.6 Ensure responsive design works across all screen sizes

- [x] 5.0 Test and Validate Implementation
  - [x] 5.1 Write unit tests for updated Services component with new package structure
  - [x] 5.2 Write unit tests for ServiceCard component with new pricing logic
  - [x] 5.3 Write unit tests for ServiceModal component with updated content
  - [x] 5.4 Test modal functionality (open/close, keyboard navigation, accessibility)
  - [x] 5.5 Test responsive design on mobile, tablet, and desktop viewports
  - [x] 5.6 Validate that PWA and Media Partnership services are unaffected
  - [x] 5.7 Run full test suite to ensure no regressions: `npm test`
  - [x] 5.8 Test in development environment: `npm run dev`
  - [x] 5.9 Validate accessibility using screen readers and keyboard-only navigation
