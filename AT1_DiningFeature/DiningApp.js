/*
  Program: Dining Meal Booking Feature
  Student Name: Nathaniel Posanai
  Student ID: 240160
  Date: 17 July 2026
  Description: A JavaScript program demonstrating classes,
  objects, constructors, private fields and methods.
*/

// DiningApp.js
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const MealBooking = require("./MealBooking");
const Student = require("./Student");

const rl = readline.createInterface({ input, output });

const bookings = [];

async function main() {

    let another = "Y";

    // Loop to allow multiple bookings
    while (another.toUpperCase() === "Y") {

        try {

            // Display header
            console.log("\n========================================");
            console.log("       DWU DINING MEAL BOOKING");
            console.log("========================================");

            // ========================================
            // STUDENT INFORMATION
            // ========================================

            // Ask user for student information
            const studentId = await rl.question("Enter Student ID: ");
            const firstName = await rl.question("Enter First Name: ");
            const lastName = await rl.question("Enter Last Name: ");

            // Create Student object
            const student = new Student(
                studentId,
                firstName,
                lastName
            );

            // Display Student information
            console.log();
            student.displayInfo();

            // ========================================
            // MEAL BOOKING INFORMATION
            // ========================================

            // Ask only for meal booking details.
            // Student information comes from the Student object.
            const mealDate = (
                await rl.question("Meal Date (YYYY-MM-DD): ")
            ).trim();

            const mealType = (
                await rl.question(
                    "Meal Type (Breakfast/Lunch/Dinner): "
                )
            ).trim();

            const quantity = Number(
                await rl.question("Quantity: ")
            );

            const dietaryNote = (
                await rl.question("Dietary Note: ")
            ).trim();

            // Create a new MealBooking using the Student object
            const booking = new MealBooking(
                student.studentId,
                student.getFullName(),
                mealDate,
                mealType,
                quantity,
                dietaryNote
            );

            // Validate the booking
            booking.validate();

            // Check for duplicate booking
            const duplicate = bookings.find(b =>
                b.getStudentID() === booking.getStudentID() &&
                b.getMealDate() === booking.getMealDate() &&
                b.getMealType() === booking.getMealType()
            );

            // If duplicate booking is found, throw an error
            if (duplicate) {
                throw new Error("Duplicate booking already exists.");
            }

            // Store booking in the array
            bookings.push(booking);

            // Display booking summary
            console.log(booking.getSummary());

        }

        catch (error) {

            console.log("\n========================================");
            console.log("ERROR");
            console.log("========================================");
            console.log(error.message);

        }

        // Ask whether another booking should be created
        another = await rl.question(
            "\nEnter another booking? (Y/N): "
        );
    }

    rl.close();
}

main();