/*
  Program: DWU Dining Meal Booking
  File: Student.js
  Student Name: Nathaniel Posanai
  Student ID: 240160
  Description:
  Student class with dining account assignment.
*/

const DiningAccount = require("./DiningAccount");

class Student {
    #studentID;
    #firstName;
    #lastName;
    #diningAccount;

    constructor(studentID, firstName, lastName) {
        if (!studentID || typeof studentID !== "string") {
            throw new Error("Student ID must be a valid string.");
        }

        if (!firstName || typeof firstName !== "string") {
            throw new Error("First name must be a valid string.");
        }

        if (!lastName || typeof lastName !== "string") {
            throw new Error("Last name must be a valid string.");
        }

        this.#studentID = studentID;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#diningAccount = null;
    }

    getStudentID() {
        return this.#studentID;
    }

    getFirstName() {
        return this.#firstName;
    }

    getLastName() {
        return this.#lastName;
    }

    getFullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    assignDiningAccount(account) {
        if (!(account instanceof DiningAccount)) {
            throw new Error(
                "Invalid dining account. The account must be a DiningAccount or one of its subclasses."
            );
        }

        this.#diningAccount = account;

        console.log(
            `Dining account ${account.getAccountNumber()} assigned to ${this.getFullName()}.`
        );
    }

    getDiningAccount() {
        return this.#diningAccount;
    }

    displayStudentDetails() {
        console.log("========================================");
        console.log("             STUDENT DETAILS");
        console.log("========================================");
        console.log(`Student: ${this.getFullName()}`);
        console.log(`Student ID: ${this.#studentID}`);

        if (this.#diningAccount) {
            console.log(
                `Dining Account: ${this.#diningAccount.getAccountNumber()}`
            );
            console.log(
                `Account Balance: K${this.#diningAccount.getBalance().toFixed(2)}`
            );
        } else {
            console.log("Dining Account: Not assigned");
        }

        console.log("========================================");
    }
}

module.exports = Student;