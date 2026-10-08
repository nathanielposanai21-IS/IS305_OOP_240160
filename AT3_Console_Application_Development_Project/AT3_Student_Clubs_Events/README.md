# DWU Student Clubs & Events System

IS305 Object-Oriented Programming — AT3 console application foundation and approved **Student Clubs and Events System** subsystem.

## Overview

This Node.js application provides a connected console workflow for registering students, managing clubs, joining clubs, creating events, registering for events, recording attendance, publishing announcements, and managing the required Campus Service Request pass component.

The project deliberately keeps the required pass files:

- `User.js`
- `ServiceRequest.js`
- `ServiceRequestManager.js`
- `CampusServiceApp.js`
- `README.md`

The main subsystem uses array-backed domain managers for an easy demonstration, while `models/UserModel.js` and `models/DomainModels.js` provide Mongoose schemas for the MongoDB stage of the project.

## Credit Extension

The project also implements the specialised Credit Extension in `models/RequesterRoles.js` and `models/SpecializedRequests.js`:

- Inherited roles: `StudentRequester`, `StaffRequester`, `ServiceOfficer`, and `Technician`.
- Specialised requests: `ICTSupportRequest`, `MaintenanceRequest`, and `CleaningRequest`.
- Controlled workflow: `Submitted → Reviewed → Assigned → In Progress → Resolved → Closed`.
- Final cancellation state: `Cancelled`.
- Role permissions for review, technician assignment, work progress, resolution, and closure.
- Request history entries for status changes, priority assignment, comments, actors, and timestamps.
- Search by ID/title, filtering by category/status/priority/technician, and sorting by submission date or priority.

Menu option 17 opens a working Credit workflow entry for registering service roles and submitting specialised requests.

## Distinction Extension: JSON persistence and reporting

The project includes a database-free persistence stage using only `fs/promises`. The `data/` directory contains `users.json`, `serviceRequests.json`, `requestHistory.json`, and `auditLog.json`. Repository classes keep JSON file operations separate from domain objects and the console. `ServiceRequestFactory` restores the correct specialised request class when records are loaded.

`AuditLogger` records registrations, creations, updates, priority changes, assignments, status changes, resolutions, closures, and cancellations. `ReportService` produces grouped status/category/priority reports, urgent and overdue lists, technician assignment and completion reports, average resolution time, and campus-location volume.

Run the required built-in Node test runner with:

```bash
npm run test:node
```

The Node suite uses temporary directories and never overwrites the application's normal data files.

## Requirements

- Node.js 18 or later
- npm
- MongoDB 6+ for persistence work (the automated tests do not require a running database)

## Installation and running

```bash
npm install
npm start
```

Use the interactive menu. Option 17 exits the application.

## Test and syntax commands

```bash
npm test
npm run lint
```

The test suite covers the pass component, subsystem rules, and Mongoose schema definitions.

## MongoDB configuration

Copy `.env.example` to `.env` and set `MONGODB_URI`, for example:

```text
MONGODB_URI=mongodb://127.0.0.1:27017/dwu_student_clubs_events
```

The connection helper is in `models/database.js`. Persistence repositories can call `connectDatabase()` before using the exported models in `models/DomainModels.js`.

## Console menu

1. Register Student
2. Register Club
3. View Clubs
4. Join Club
5. View My Clubs
6. Create Event
7. View Events
8. Register for Event
9. View My Events
10. Cancel Event Registration
11. Record Attendance
12. View Attendance
13. Create Announcement
14. View Announcements
15. Service Requests
16. Reports
17. Exit

## Roles

### Student

- Register and maintain a student account
- View clubs and join/leave clubs
- View events and register/cancel registration
- View attendance
- View announcements
- Submit, search, update and cancel own service requests

### Club Administrator

- Register/manage clubs
- Create events and publish announcements
- Record attendance
- Produce reports

The current console is intentionally lightweight; role checks should be added to administrator-only commands during the group extension phase.

## OOP and requirement mapping

| Requirement | Evidence |
|---|---|
| Classes and objects | `User`, `ServiceRequest`, `ServiceRequestManager`, `Club`, `Event`, `ClubEventsManager` |
| Constructors | All domain classes have constructors |
| Encapsulation | Private `#` fields in `User`, `ServiceRequest`, `Club`, and `Event` |
| Getters and controlled setters | `User` setters validate input; domain objects expose getters |
| Validation | Required fields, email, enum values, capacity, ownership and duplicate checks |
| Exception handling | Console catches operation errors and displays clear messages |
| CRUD-style operations | Registration, lookup, creation, update, cancellation, search and reports |
| Object relationships | Requests reference `User`; events reference clubs; memberships and registrations reference students/events |
| MongoDB/Mongoose | `models/UserModel.js`, `models/DomainModels.js`, and `models/database.js` |
| Testing | Jest tests in `tests/` |

## Project structure

```text
AT3_Student_Clubs_Events/
├── User.js
├── ServiceRequest.js
├── ServiceRequestManager.js
├── CampusServiceApp.js
├── package.json
├── README.md
├── .env.example
├── models/
│   ├── Club.js
│   ├── Event.js
│   ├── RequesterRoles.js
│   ├── SpecializedRequests.js
│   ├── UserModel.js
│   ├── DomainModels.js
│   └── database.js
├── managers/
│   └── ClubEventsManager.js
├── repositories/
│   ├── JsonFileRepository.js
│   ├── UserFileRepository.js
│   ├── ServiceRequestFileRepository.js
│   └── AuditFileRepository.js
├── services/
│   ├── ApplicationPersistence.js
│   ├── AuditLogger.js
│   ├── ReportService.js
│   └── ServiceRequestFactory.js
├── tests/
│   ├── pass-component.test.js
│   ├── clubs-events.test.js
│   └── mongoose-models.test.js
├── docs/
│   ├── USER_GUIDE.md
│   └── TECHNICAL_DOCUMENTATION.md
└── diagrams/
    ├── use-case.mmd
    ├── class-diagram.mmd
    ├── sequence-register-event.mmd
    ├── console-navigation.mmd
    └── mongodb-data-model.mmd
```

## Academic integrity and AI declaration

Students should adapt, test, explain, and document every part of this project. Record any approved AI assistance, prompts, generated suggestions, verification steps, and changes in the institution's AI Use Declaration Form. The individual viva should demonstrate independent understanding of the code.
