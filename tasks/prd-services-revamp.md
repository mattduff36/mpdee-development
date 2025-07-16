# Product Requirements Document (PRD): Revamp Website Service Packages

## 1. Introduction/Overview

Revamp the "Website" services section to provide clearer differentiation between packages, transparent starting prices, and improved communication of value to potential customers. The new structure will help users quickly understand what each package offers and encourage more inquiries.

## 2. Goals

- Clearly communicate the features and value of each website package.
- Display starting prices for each package (except Platinum).
- Highlight the "Gold" package as the most popular.
- Ensure all packages mention the free 12 months hosting, then £10/month billed annually.
- Maintain or improve the current user experience and accessibility.
- Increase user inquiries and reduce confusion about offerings.

## 3. User Stories

*Note: User stories will be added in a future update.*

## 4. Functional Requirements

1. Replace the current 3 website packages with 4 new packages:
   - **Bronze** (new, most affordable)
     - 1 or 2 page basic holding page
     - Free domain name (1 year)
     - Free hosting (1 year)
     - Price starts at £100
     - 12 months hosting free, then £10/month billed annually
   - **Silver** (was "Essential")
     - All features from old "Essential" package
     - 3 months free support
     - Price starts at £300
     - 12 months hosting free, then £10/month billed annually
   - **Gold** (was "Business", now "Most Popular")
     - All features from old "Business" package
     - 6 months free support
     - Price starts at £550
     - 12 months hosting free, then £10/month billed annually
   - **Platinum** (was "Premium")
     - All features from old "Premium" package
     - 12 months free support
     - Please contact for price
     - 12 months hosting free, then £10/month billed annually

2. Each package must have a dedicated modal/details view, with the same structure and formatting as currently implemented.

3. The "Gold" package must be visually highlighted as "Most Popular".

4. Pricing should only be shown in the modal/details view, not on the main card.

5. Use professional, non-emoji icons for each package (SVG or outline style).

6. The "PWA" and "Media Partnership" services remain unchanged and in the same section.

## 5. Non-Goals (Out of Scope)

- No online purchase or checkout functionality.
- No side-by-side package comparison (for now).
- No changes to PWA or Media Partnership services.

## 6. Design Considerations

- Use professional SVG or outline icons for each package.
- Highlight the "Gold" package as "Most Popular" (badge/accent).
- Modal/details structure and formatting should remain as currently implemented.
- Ensure accessibility (keyboard navigation, ARIA labels, etc.).
- Responsive design for all screen sizes.

## 7. Technical Considerations

- Update the `services` array and modal logic in the Services component.
- Ensure all new/renamed packages have correct details, pricing, and support info.
- Add a note about hosting: "12 months hosting free, then £10/month billed annually" to all website packages.
- Use appropriate SVG/outline icons (can use Heroicons, Tabler Icons, or similar).
- No changes to the backend/API required.

## 8. Success Metrics

- Increased number of user inquiries about website packages.
- Reduced confusion as measured by user feedback.
- Improved upsell rate to higher-tier packages.

## 9. Open Questions

- User stories and side-by-side comparison feature to be added in a future update. 