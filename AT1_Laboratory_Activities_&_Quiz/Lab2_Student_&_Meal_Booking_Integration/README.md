# DWU Dining Meal Booking

## Student Details

**Name:** Nathaniel P. POSANAI  
**Student ID:** 240160

## GitHub Repository

https://github.com/nathanielposanai21-IS/IS305_OOP_240160.git

---

## 1. Project Description

The **DWU Dining Meal Booking** application is a Node.js console-based application developed for the DWU Dining Hall.

The application allows students to create meal bookings by entering their student information and selecting a meal type, meal date, quantity, and dietary requirements.

The application demonstrates Object-Oriented Programming (OOP) concepts including:

- Classes and objects
- Constructors
- Encapsulation
- Private fields
- Getters and setters
- Methods
- Input validation
- Object creation and management

The system also calculates the total meal cost, assigns a default booking status, prevents duplicate bookings, and displays a booking summary.

---

## 2. Application Features

The application provides the following features:

- Create a student profile.
- Enter Student ID, first name, and last name.
- Display student information.
- Create a meal booking.
- Select Breakfast, Lunch, or Dinner.
- Enter a meal date.
- Specify meal quantity.
- Enter dietary notes.
- Validate booking information.
- Calculate the total meal cost.
- Assign new bookings a **Pending** status.
- Confirm a booking.
- Cancel a booking.
- Prevent duplicate bookings.
- Display a booking receipt/summary.
- Allow users to create multiple bookings during one program session.

---

## 3. Project Files

### Student.js

`Student.js` contains the `Student` class.

The class stores:

- Student ID
- First name
- Last name

The class uses JavaScript private fields:

```javascript
#studentID;
#firstName;
#lastName;
