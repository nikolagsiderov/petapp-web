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

# [0.1.0]

## Added

- Added GitHub Action to sync CHANGELOG to Confluence

# [0.2.0]

## Added

- Integration of TanStack React Query
- Massive improvement on the client & server state management

## Changed

- Changed website language icon from USA to GB

# [0.2.1]

## Added

- Basic loader component when listings are loading

## Fixed

- Fixed image uploading
- Navigation bar menu now centered at all times

# [0.2.2]

## Added

- Added new EmailInput component with email validation
- Applied new EmailInput component in Login page

## Changed

- Localization now pre-loaded in ClientOnly component

# [0.2.3]

## Added

- Upgraded pawpal-fe-common@0.0.163
- Added new Verification page, redirecting to mobile app, if user has it installed

## Changed

- Updated client import namespaces to latest pawpal-fe-common package version

# [0.2.4]

## Added

- Upgraded pawpal-fe-common@0.0.169
- Added user email verification mutation

## Changed

- Minor re-design of the verification page

# [0.2.5]

## Added

- Upgraded pawpal-fe-common@0.0.172

## Changed

- Minor re-design of the verification page v2

# [0.3.0]

## Added

- Upgraded pawpal-fe-common@0.0.183
- Handling authentication through HTTP-only access token cookie
- Added AuthContext and provider
- Added useSignOutBE query which calls the /api/v1/users/logout endpoint
- Added useAuth() hook which now implements queries enable status

## Changed

- Due to HTTP-only cookie nature, authentication will not be supported currently during local development, i.e. 'localhost', as it is not HTTPS
