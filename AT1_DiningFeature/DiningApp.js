const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const MealBooking = require("./MealBooking");

const rl = readline.createInterface({ input, output });

const bookings = [];

async function main() {

    let another = "Y";

    while (another.toUpperCase() === "Y") {

        try {

            console.log("\n========================================");
            console.log("       DWU DINING MEAL BOOKING");
            console.log("========================================");

            const studentID = (await rl.question("Student ID: ")).trim();
            const studentName = (await rl.question("Student Name: ")).trim();
            const mealDate = (await rl.question("Meal Date (YYYY-MM-DD): ")).trim();
            const mealType = (await rl.question("Meal Type (Breakfast/Lunch/Dinner): ")).trim();
            const quantity = parseInt(await rl.question("Quantity: "));
            const dietaryNote = (await rl.question("Dietary Note: ")).trim();

            const booking = new MealBooking(
                studentID,
                studentName,
                mealDate,
                mealType,
                quantity,
                dietaryNote
            );

            booking.validate();

            const duplicate = bookings.find(b =>
                b.getStudentID() === booking.getStudentID() &&
                b.getMealDate() === booking.getMealDate() &&
                b.getMealType() === booking.getMealType()
            );

            if (duplicate) {
                throw new Error("Duplicate booking detected.");
            }

            bookings.push(booking);

            console.log(booking.getSummary());

        }

        catch (error) {

            console.log("\n========================================");
            console.log("ERROR");
            console.log("========================================");
            console.log(error.message);

        }

        another = await rl.question("\nEnter another booking? (Y/N): ");

    }

    rl.close();

}

main();