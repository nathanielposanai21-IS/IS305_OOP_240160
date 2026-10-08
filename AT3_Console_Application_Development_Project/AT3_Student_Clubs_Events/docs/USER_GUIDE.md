# User Guide

## Starting the system

Run `npm install`, then `npm start`. The system displays the DWU Student Clubs & Events menu.

## Recommended demonstration workflow

1. Register a student using a unique ID and valid email.
2. Register a club using one of the supported categories.
3. View clubs and join a club.
4. Create an event for the club.
5. Register the student for the event.
6. View the student's events.
7. Record attendance as `Present` or `Absent`.
8. Publish and view an announcement.
9. Open Service Requests and submit a request.
10. Search, update, and cancel the request.
11. Select Reports to show system totals.

## Demonstrating the Credit Extension

1. Select menu option 17 and choose `register-role` to register a Service Officer and a Technician.
2. Select menu option 17 again and choose `specialised-request`.
3. Select ICT, Maintenance, or Cleaning and enter the specialised fields.
4. Use the manager workflow methods from the application integration to review, assign, start, update, resolve, and close the request.
5. Explain the request's status history during the viva.

## Demonstrating JSON persistence and reporting

1. Run the application once and register a user or submit a request.
2. Exit and restart the application; existing records are loaded from `data/`.
3. Show `users.json`, `serviceRequests.json`, `requestHistory.json`, and `auditLog.json` as simulated data files.
4. Explain that repositories perform file operations and the factory restores specialised request objects.
5. Use Reports and explain grouped status, category, priority, urgent, overdue, technician, resolution-time, and location reports.
6. Run `npm run test:node` to demonstrate the isolated built-in Node test suite.

## Supported values

- Club categories: Academic, Sports, Culture, Technology, Religious, Social
- Event statuses: Scheduled, Cancelled, Completed
- Attendance: Present, Absent
- Service categories: ICT Support, Facilities Maintenance, Cleaning and Sanitation, General Campus Service
- Service priorities: Low, Normal, High, Urgent

## Common error messages

The application rejects duplicate IDs, missing fields, invalid categories, invalid priorities, duplicate memberships, duplicate event registrations, cancelled-event registrations, over-capacity registration, unauthorized request changes, and repeated cancellation.
