# DWU Dining Meal Booking

## Student

**Name:** Nathaniel P. POSANAI
**Student ID:** 240160

## GitHub Repository

https://github.com/nathanielposanai21-IS/IS305_OOP_240160.git

## Lab 3 – Dining Account Distinction Extension

### Description

This application is an extension of the DWU Dining Meal Booking system developed for the previous laboratory activities.

Lab 3 introduces different types of dining accounts. The application demonstrates **object-oriented programming concepts** including classes, objects, private fields, encapsulation, inheritance, constructor chaining, method overriding, validation, and transactions.

The system supports:

* Standard Dining Accounts
* Rewards Dining Accounts
* Account number validation
* Opening balance validation
* Deposits
* Meal payments
* Transaction records
* Reward rate calculation
* Applying rewards to an account balance
* Student information management
* Meal bookings
* Meal cost calculation
* Duplicate booking prevention
* Booking validation
* Booking receipt display

## Files

### DiningAccount.js

Contains the `DiningAccount` class.

The class manages:

* Account number
* Account balance
* Transactions
* Deposits
* Meal payments
* Account balance retrieval
* Transaction history
* Account summary

The class uses private fields to protect account information.

### RewardsDiningAccount.js

Contains the `RewardsDiningAccount` class.

`RewardsDiningAccount` extends the `DiningAccount` class and demonstrates **inheritance** and **constructor chaining** using `super()`.

Additional functionality includes:

* Reward rate
* Reward calculation
* Applying rewards
* Rewards account summary
* Reward rate validation

### Student.js

Contains the `Student` class.

The class manages:

* Student ID
* First name
* Last name
* Full name
* Student information display

Private fields and getters/setters are used to demonstrate encapsulation.

### MealBooking.js

Contains the `MealBooking` class.

The class manages:

* Student information
* Meal date
* Meal type
* Quantity
* Dietary notes
* Booking status
* Meal prices
* Booking validation
* Total cost calculation
* Booking confirmation
* Booking cancellation
* Booking summary

### DiningApp.js

Runs the complete application and accepts user input.

It demonstrates the use of the dining account classes together with the existing student and meal booking functionality.

### README.md

Contains the project documentation and instructions for running the application.

## Object-Oriented Programming Concepts

### Classes and Objects

The application uses multiple classes:

* `DiningAccount`
* `RewardsDiningAccount`
* `Student`
* `MealBooking`

Objects are created from these classes to represent dining accounts, students, and meal bookings.

### Encapsulation

Private fields are used to protect important data.

For example, `DiningAccount` uses:

```javascript
#accountNumber
#balance
#transactions
```

The `Student` class also uses private fields for student information.

### Inheritance

`RewardsDiningAccount` inherits from `DiningAccount`:

```javascript
class RewardsDiningAccount extends DiningAccount
```

This allows the rewards account to reuse the functionality of the standard dining account.

### Constructor Chaining

The `RewardsDiningAccount` constructor calls the parent constructor using:

```javascript
super(accountNumber, openingBalance);
```

This initializes the account information defined by `DiningAccount`.

### Method Overriding

`RewardsDiningAccount` provides its own version of:

```javascript
displayAccountSummary()
```

This demonstrates method overriding because the rewards account displays additional reward information.

## Account Functionality

### Standard Dining Account

The standard dining account supports:

* Account creation
* Opening balance
* Deposits
* Meal payments
* Balance checking
* Transaction recording

Example account:

```text
Account Number: DA001
Opening Balance: K1000.00
Deposit: K500.00
Payment: K200.00
```

### Rewards Dining Account

The rewards dining account extends the standard dining account and provides reward functionality.

Example:

```text
Account Number: RA001
Balance Before Reward: K2000.00
Reward Rate: 2.5%
Reward Earned: K50.00
Final Balance: K2050.00
```

## Meal Booking Functionality

The application allows a student to enter:

* Student ID
* First name
* Last name
* Meal date
* Meal type
* Quantity
* Dietary note

The available meal types are:

| Meal Type |  Price |
| --------- | -----: |
| Breakfast | K10.00 |
| Lunch     | K15.00 |
| Dinner    | K20.00 |

The application calculates the total meal cost based on the selected meal type and quantity.

## Validation

The application performs validation to prevent invalid data.

Examples include:

* Account number cannot be empty.
* Opening balance cannot be negative.
* Deposit amount must be greater than zero.
* Meal payment amount must be greater than zero.
* Reward rate must be between 0% and 100%.
* Student ID is required.
* Student name is required.
* Meal date is required.
* Meal type must be Breakfast, Lunch, or Dinner.
* Quantity must be at least 1.
* Duplicate bookings are not allowed for the same student, date, and meal type.

## Transaction Management

Dining account transactions are stored in a transaction list.

Transactions can include:

* Opening Balance
* Deposit
* Meal Payment
* Rewards Earned

The transaction history can be retrieved using:

```javascript
getTransactions()
```

The method returns a copy of the transaction array to help protect the original transaction data.

## How to Run

Make sure Node.js is installed on the computer.

Open the terminal in the Lab 3 project folder and run:

```bash
node DiningApp.js
```

## Example Execution

```text
========================================
       STANDARD DINING ACCOUNT
========================================
Account Number: DA001
Opening Balance: K1000.00
Deposit: K500.00
Payment successful. Balance: K1300.00

========================================
        REWARDS DINING ACCOUNT
========================================
Account Number: RA001
Balance Before Reward: K2000.00
Reward Rate: 2.5%
Reward Earned: K50.00
Final Balance: K2050.00
========================================
```

The application then continues to the DWU Dining Meal Booking section where the user can enter student and meal booking information.

## Tests Completed

### Standard Dining Account

✔ Valid account creation
✔ Account number validation
✔ Opening balance validation
✔ Deposit transaction
✔ Meal payment
✔ Insufficient balance handling
✔ Transaction recording

### Rewards Dining Account

✔ Rewards account creation
✔ Inheritance from `DiningAccount`
✔ Constructor chaining using `super()`
✔ Reward rate validation
✔ Reward calculation
✔ Reward application
✔ Method overriding

### Student

✔ Student object creation
✔ Private student fields
✔ Getters and setters
✔ Full name generation
✔ Student information display

### Meal Booking

✔ Valid Booking
✔ Invalid Booking
✔ Duplicate Booking
✔ Meal cost calculation
✔ Dietary note handling
✔ Booking status
✔ Booking receipt display

## Technologies Used

* JavaScript
* Node.js
* Visual Studio Code
* Git
* GitHub

## Project Structure

```text
Lab3_Dining_Account_Distinction_Extention/
│
├── DiningAccount.js
├── RewardsDiningAccount.js
├── Student.js
├── MealBooking.js
├── DiningApp.js
└── README.md
```

## Author

**Nathaniel P. POSANAI**
**Student ID: 240160**

Divine Word University
