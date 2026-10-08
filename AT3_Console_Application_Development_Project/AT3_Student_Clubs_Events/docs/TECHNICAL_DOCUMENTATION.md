# Technical Documentation

## Architecture

The application is organised into a domain layer, manager layer, console layer, and persistence layer.

- **Domain layer:** `User`, `ServiceRequest`, `Club`, and `Event` own state and validation.
- **Manager layer:** `ServiceRequestManager` and `ClubEventsManager` coordinate collections, relationships, authorization, capacity, and searches.
- **Console layer:** `CampusServiceApp` translates prompts into manager operations and catches errors at the menu boundary.
- **Persistence layer:** Mongoose schemas model users, clubs, events, memberships, attendance, announcements, and service requests.

## Encapsulation

Private class fields prevent external code from changing critical state directly. Changes occur through constructors, controlled setters, or methods such as `updateDetails`, `cancelRequest`, `cancel`, and `complete`.

## Validation and authorization

Validation occurs at object construction and manager operations. The manager rejects duplicates and requires a requester to be registered. Update and cancellation operations verify that the current user owns the request. Event registration checks status, duplicate registration, and capacity.

## Data model

The MongoDB model uses string business identifiers (`userId`, `clubId`, `eventId`, `requestId`) so the console IDs remain readable. Compound unique indexes prevent duplicate membership and attendance records. Enum fields protect controlled values.

## Testing strategy

- Unit tests validate constructors, allowed values, duplicate detection, ownership, search, status changes, membership and capacity rules.
- Schema tests verify model names, enum values, and numeric constraints.
- Run `npm test` before each commit and `npm run lint` to check the main entry point.

## Future group extensions

1. Add role-based authorization middleware/service methods for administrator-only operations.
2. Add repository classes that translate domain objects to Mongoose documents.
3. Add a configuration module and graceful database startup/shutdown.
4. Add integration tests against a test MongoDB instance.
5. Add audit logs, pagination, richer reports, and input sanitisation.
6. Add GitHub Actions to run tests on every push.

## Credit Extension design

`RequesterRoles.js` demonstrates inheritance and constructor chaining. Each role calls `super()` and validates its specialised field. `SpecializedRequests.js` applies the same pattern to ICT, maintenance, and cleaning requests. The specialised classes override `getRequestSummary()` and provide category-specific priority scoring and target resolution hours.

`ServiceRequest` owns the permitted state-transition map. `ServiceRequestManager` is the authorization boundary: it checks officer and technician roles, confirms the assigned technician, and delegates valid transitions to the request. Every approved transition or priority assignment appends an audit record with previous status, new status, action, actor, comment, and timestamp.

The Credit tests in `tests/credit-extension.test.js` verify constructor chaining, specialised validation, role permissions, invalid transitions, history, search, filters, and sorting.

## Distinction Extension design

The specialised requests share one collection and are processed polymorphically through `getRequestSummary()`, `calculatePriorityScore()`, and `getTargetResolutionHours()`. `ServiceRequestFactory.createFromData()` uses the saved `requestType` to restore the appropriate active class instead of returning plain objects.

JSON persistence is separated into `JsonFileRepository`, `UserFileRepository`, `ServiceRequestFileRepository`, and `AuditFileRepository`. Missing files are created as empty arrays, malformed files produce explicit errors, and all automated persistence tests use temporary directories. `ApplicationPersistence` coordinates repositories so `CampusServiceApp` does not directly read or write files.

`AuditLogger` uses UUID audit IDs and ISO timestamps. `ReportService` uses `filter`, `map`-style grouping and `reduce` operations to generate management reports. The built-in Node test runner suite contains 13 tests covering construction, invalid values, duplicates, permissions, transitions, polymorphism, persistence, restoration, missing files, file errors, audit records, and reports.
