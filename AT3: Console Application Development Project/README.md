# 🎓 Student Clubs and Events System

> **IS305 – Object-Oriented Programming**  
> **AT3: Group Console Application Development Project**  
> Divine Word University  
> Department of Information Systems  
> Semester 2, 2026

![Node.js](https://img.shields.io/badge/Node.js-v24-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![GitHub](https://img.shields.io/badge/GitHub-Version%20Control-black)

---

# 📖 Project Overview

The **Student Clubs and Events System** is a Node.js console-based application developed as part of the **IS305 Object-Oriented Programming** course at Divine Word University.

This system provides a centralized platform for managing student clubs and campus events. It enables students to join clubs, register for events, record attendance, and receive announcements, while administrators can manage clubs, events, memberships, and reports.

The project applies Object-Oriented Programming (OOP) concepts using JavaScript, Node.js, MongoDB, and Mongoose, following the project requirements specified for AT3.

---

# 🎯 Project Objectives

The system aims to:

- Manage student club memberships.
- Register students for campus events.
- Record event attendance.
- Publish club and event announcements.
- Apply Object-Oriented Programming principles.
- Store and retrieve information using MongoDB.
- Demonstrate GitHub collaboration and version control.

---

# ✨ Features

### 👨‍🎓 Student

- View available clubs
- Join a club
- Leave a club
- View registered clubs
- Register for events
- View upcoming events
- View announcements
- View attendance history

### 👨‍💼 Administrator

- Create clubs
- Update club information
- Delete clubs
- Create events
- Manage event registrations
- Record attendance
- Publish announcements
- Generate reports

---

# 👥 User Roles

## Student

Students can:

- Join clubs
- Register for events
- View announcements
- Check attendance
- Update personal information

---

## Administrator

Administrators can:

- Manage clubs
- Manage events
- Manage memberships
- Publish announcements
- Record attendance
- Generate reports

---

# 📚 User Stories

### Student

- As a student, I want to join a club so I can participate in its activities.
- As a student, I want to register for an event online.
- As a student, I want to view announcements from my clubs.

### Administrator

- As an administrator, I want to create events for clubs.
- As an administrator, I want to record attendance for each event.
- As an administrator, I want to publish announcements for students.

---

# 🛠 Technologies Used

- JavaScript (ES6)
- Node.js
- MongoDB
- Mongoose
- Git
- GitHub
- Visual Studio Code

---

# 💻 Object-Oriented Programming Concepts

The project demonstrates:

- ✅ Classes
- ✅ Objects
- ✅ Constructors
- ✅ Encapsulation
- ✅ Inheritance
- ✅ Polymorphism
- ✅ Abstraction
- ✅ Exception Handling

---

# 🗄 Database Design

Example MongoDB Collections:

```
students
clubs
memberships
events
registrations
attendance
announcements
admins
```

---

# 📂 Project Structure

```
StudentClubsEventsSystem/
│
├── models/
│   ├── Student.js
│   ├── Club.js
│   ├── Event.js
│   ├── Membership.js
│   ├── Attendance.js
│   └── Announcement.js
│
├── controllers/
│
├── services/
│
├── routes/
│
├── database/
│
├── screenshots/
│
├── documentation/
│
├── app.js
├── package.json
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Student-Clubs-and-Events-System.git
```

## Navigate to the project

```bash
cd Student-Clubs-and-Events-System
```

## Install dependencies

```bash
npm install
```

## Start MongoDB

```bash
mongod
```

## Run the application

```bash
node app.js
```

---

# 🧭 Console Menu

```
=============================
 Student Clubs & Events System
=============================

1. Student Login
2. Administrator Login
3. View Clubs
4. Register for Event
5. View Announcements
6. Exit

Select Option:
```

---

# 🔄 CRUD Operations

The application supports complete CRUD functionality.

### Clubs

- Create Club
- View Clubs
- Update Club
- Delete Club

### Events

- Create Event
- View Events
- Update Event
- Delete Event

### Memberships

- Join Club
- View Membership
- Update Membership
- Remove Membership

### Announcements

- Create Announcement
- View Announcements
- Edit Announcement
- Delete Announcement

---

# 🧪 Testing

The project has been tested for:

- Menu navigation
- Input validation
- Invalid user input
- CRUD functionality
- MongoDB connection
- Exception handling
- Registration process
- Attendance recording

---

# 📷 Screenshots

Add screenshots of the application inside the **screenshots/** folder.

Example:

```
screenshots/

main-menu.png
student-login.png
club-registration.png
event-registration.png
attendance.png
mongodb.png
```

---

# 📊 Future Improvements

Future versions may include:

- Password authentication
- QR Code attendance
- Email notifications
- Event reminders
- Certificate generation
- Mobile application
- REST API
- Dashboard analytics

---

# 👨‍💻 Team Members

| Name | Student ID | Role |
|------|------------|------|
| Member 1 | 240XXX | Team Leader |
| Member 2 | 240XXX | Backend Developer |
| Member 3 | 240XXX | Database Developer |
| Member 4 | 240XXX | Testing |
| Member 5 | 240XXX | Documentation |
| Member 6 | 240XXX | Presentation |

---

# 📌 Assessment Information

**Unit:** IS305 – Object-Oriented Programming

**Assessment:** AT3 – Group Console Application Development Project

The project demonstrates the application of:

- Object-Oriented Programming
- JavaScript
- Node.js
- MongoDB
- Mongoose
- GitHub Version Control
- Console-Based Application Development
- Software Testing
- Technical Documentation

---

# 🤝 Contribution

Each team member contributes through:

- Source code development
- GitHub commits
- Testing
- Documentation
- Database development
- Project planning
- Presentation

GitHub commit history provides evidence of each member's individual contribution.

---

# 📄 License

This project was developed for educational purposes only as part of the IS305 Object-Oriented Programming course at Divine Word University.

© 2026 Department of Information Systems  
Divine Word University
