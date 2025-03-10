# [0.3.0]

## Added

- Upgraded pawpal-fe-common@0.0.197
- Added two more parameters in Calendar input component which enhance UX
- Added 'owner is watching current listing' feature
- Added listing reserved dates as disabled dates in details page when reserving listing
- Filter and sorting of reservations

## Changed

- Become pet sitter modal now has Continue button disabled by default, enables only when values are present
- Moved ProtectedRoute to AuthContext
- CategoryInput component now displays SVG
- Menu item 'My services' now hidden if user is not a pet sitter
- On successful creation of listing we now invalidate the current user listings

# [0.2.13]

## Changed

- Handle on loading state on error in authentication pages & modals

# [0.2.12]

## Changed

- Separated ListingCard component into three new components for better development

# [0.2.11]

## Changed

- Added protected route component, which now validates if user is authenticated to continue page access

# [0.2.10]

## Changed

- Add/remove to/from favorites now triggers optimistic state update

# [0.2.9]

## Added

- Upgraded pawpal-fe-common@0.0.191 to enable full scale localization

## Changed

- Removed Redux

# [0.2.8]

## Added

- Added Google Authentication Support

# [0.2.7]

## Added

- Upgraded pawpal-fe-common@0.0.190
- Added verification required page after user registration
- Added new checkbox input component
- Added new checkbox component in LoginClient and LoginModal as 'Remember me' option

# [0.2.6]

## Added

- Upgraded pawpal-fe-common@0.0.189
- Added AuthContext and provider
- Added useSignOutBE query which calls the /api/v1/users/logout endpoint
- Added useAuth() hook which now implements queries enable status

# [0.2.5]

## Added

- Upgraded pawpal-fe-common@0.0.172

## Changed

- Minor re-design of the verification page v2

# [0.2.4]

## Added

- Upgraded pawpal-fe-common@0.0.169
- Added user email verification mutation

## Changed

- Minor re-design of the verification page

# [0.2.3]

## Added

- Upgraded pawpal-fe-common@0.0.163
- Added new Verification page, redirecting to mobile app, if user has it installed

## Changed

- Updated client import namespaces to latest pawpal-fe-common package version

# [0.2.2]

## Added

- Added new EmailInput component with email validation
- Applied new EmailInput component in Login page

## Changed

- Localization now pre-loaded in ClientOnly component

# [0.2.1]

## Added

- Basic loader component when listings are loading

## Fixed

- Fixed image uploading
- Navigation bar menu now centered at all times

# [0.2.0]

## Added

- Integration of TanStack React Query
- Massive improvement on the client & server state management

## Changed

- Changed website language icon from USA to GB

# [0.1.0]

## Added

- Added GitHub Action to sync CHANGELOG to Confluence

# [0.0.0]

## Added

- Application versioning and change log.
- v0.0.0 in CHANGELOG.md will serve as an example of how to write downs any Added/Fixed/Changes features/bugs/files/etc.
- Write down description of what has been added.

## Fixed

- Write down description of what has been fixed.

## Changed

- IMPORTANT: Be sure to keep track and in-sync both package.json file version property and environment variable NEXT_PUBLIC_VERSION.
- IMPORTANT: For consistency, follow Semantic Versioning: MAJOR.MINOR.PATCH
- Write down description of what has been changed/modified.
