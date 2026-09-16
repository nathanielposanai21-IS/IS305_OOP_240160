/* Program: Dining Meal Booking Feature
  Student Name: Nathaniel Posanai
  Student ID: 240160
  Date: 17 July 2026
  Description: A JavaScript program demonstrating classes,
  objects, constructors, private fields, inheritance,
  constructor chaining and dining accounts.
*/

// DiningApp.js
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const MealBooking = require("./MealBooking");
const Student = require("./Student");
const DiningAccount = require("./DiningAccount");
const RewardsDiningAccount = require("./RewardsDiningAccount");

const rl = readline.createInterface({ input, output });

const bookings = [];

async function main() {

    // =========================================================
    // PART 1 - STANDARD DINING ACCOUNT
    // =========================================================

    console.log("\n========================================");
    console.log("       STANDARD DINING ACCOUNT");
    console.log("========================================");

    try {
        // Create a DiningAccount with K1,000 opening balance
        const account = new DiningAccount("DA001", 1000);

        console.log(`Account Number: ${account.getAccountNumber()}`);
        console.log(`Opening Balance: K${account.getBalance().toFixed(2)}`);

        // Deposit K500
        account.deposit(500);
        console.log("Deposit: K500.00");

        // Attempt to pay K200 for a meal
        const paymentSuccessful = account.payForMeal(
            200,
            "Meal Payment"
        );

        console.log(
            paymentSuccessful
                ? `Payment successful. Balance: K${account.getBalance().toFixed(2)}`
                : "Payment failed."
        );

    } catch (error) {
        console.log("\nERROR");
        console.log(error.message);
    }


    // =========================================================
    // PART 1 - REWARDS DINING ACCOUNT
    // =========================================================

    console.log("\n========================================");
    console.log("        REWARDS DINING ACCOUNT");
    console.log("========================================");

    try {
        // Create RewardsDiningAccount with K1,500 opening balance
        // and a reward rate of 2.5%
        const rewardsAccount = new RewardsDiningAccount(
            "RA001",
            1500,
            2.5
        );

        // Deposit K500
        rewardsAccount.deposit(500);

        console.log(
            `Account Number: ${rewardsAccount.getAccountNumber()}`
        );

        console.log(
            `Balance Before Reward: K${rewardsAccount.getBalance().toFixed(2)}`
        );

        console.log(
            `Reward Rate: ${rewardsAccount.getRewardRate()}%`
        );

        // Calculate reward
        const reward = rewardsAccount.calculateReward();

        console.log(
            `Reward Earned: K${reward.toFixed(2)}`
        );

        // Apply reward
        rewardsAccount.applyReward();

        // Display final balance
        console.log(
            `Final Balance: K${rewardsAccount.getBalance().toFixed(2)}`
        );

    } catch (error) {
        console.log("\nERROR");
        console.log(error.message);
    }

    console.log("========================================");


    // =========================================================
    // EXISTING LAB 2 - DINING MEAL BOOKING
    // =========================================================

    let another = "Y";

    // Loop to allow multiple bookings
    while (another.toUpperCase() === "Y") {

        try {

            // Display header
            console.log("\n========================================");
            console.log("       DWU DINING MEAL BOOKING");
            console.log("========================================");

            // Ask for student information
            const studentId = await rl.question("Enter Student ID: ");
            const firstName = await rl.question("Enter First Name: ");
            const lastName = await rl.question("Enter Last Name: ");

            // Create Student Object
            const student = new Student(
                studentId,
                firstName,
                lastName
            );

            // Display student information
            console.log();
            student.displayInfo();

            // Get booking details from user
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

            // Create a new MealBooking instance
            const booking = new MealBooking(
                student.studentID,
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

            // If a duplicate booking is found, throw an error
            if (duplicate) {
                throw new Error(
                    "Duplicate booking already exists."
                );
            }

            // Add booking to the bookings array
            bookings.push(booking);

            // Display booking summary
            console.log(booking.getSummary());

        } catch (error) {

            console.log("\n========================================");
            console.log("ERROR");
            console.log("========================================");
            console.log(error.message);
        }

        // Ask the user if they want to make another booking
        another = await rl.question(
            "\nEnter another booking? (Y/N): "
        );
    }

    rl.close();
}

// Run the application
main();
