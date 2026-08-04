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

const rl = readline.createInterface({ input, output });

const bookings = [];

async function main() {

    let another = "Y";
    
    // Loop to allow multiple bookings
    while (another.toUpperCase() === "Y") {
        
        // Prompt user for booking details
        try {
            
            // Display header
            console.log("\n========================================");
            console.log("       DWU DINING MEAL BOOKING");
            console.log("========================================");

            // Get booking details from user
            const studentID = (await rl.question("Student ID: ")).trim();
            const studentName = (await rl.question("Student Name: ")).trim();
            const mealDate = (await rl.question("Meal Date (YYYY-MM-DD): ")).trim();
            const mealType = (await rl.question("Meal Type (Breakfast/Lunch/Dinner): ")).trim();
            const quantity = Number(await rl.question("Quantity: "));
            const dietaryNote = (await rl.question("Dietary Note: ")).trim();

            // Create a new MealBooking instance
            const booking = new MealBooking(
                studentID,
                studentName,
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

            // If a duplicate booking is found, throw an error
            if (duplicate) {
                throw new Error("Duplicate booking already exists.");
            }

            bookings.push(booking);

            console.log(booking.getSummary());

        }

        // Catch and display any errors that occur during booking
        catch (error) {

            console.log("\n========================================");
            console.log("ERROR");
            console.log("========================================");
            console.log(error.message);

        }

        // Ask the user if they want to make another booking
        another = await rl.question("\nEnter another booking? (Y/N): ");

    }

    rl.close();

}

main();
