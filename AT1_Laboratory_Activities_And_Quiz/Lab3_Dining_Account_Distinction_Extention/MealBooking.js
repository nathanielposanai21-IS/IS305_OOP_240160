/*
  Program: DWU Dining Meal Booking
  File: MealBooking.js
  Student Name: Nathaniel Posanai
  Student ID: 240160
  Description:
  Meal booking class with payment processing using
  polymorphism.
*/

class MealBooking {
    #studentID;
    #studentName;
    #mealDate;
    #mealType;
    #quantity;
    #dietaryNote;
    #status;
    #paymentStatus;
    #paymentProcessed;

    constructor(
        studentID,
        studentName,
        mealDate,
        mealType,
        quantity,
        dietaryNote = ""
    ) {
        if (!studentID || typeof studentID !== "string") {
            throw new Error("Student ID is required.");
        }

        if (!studentName || typeof studentName !== "string") {
            throw new Error("Student name is required.");
        }

        if (!mealDate || typeof mealDate !== "string") {
            throw new Error("Meal date is required.");
        }

        if (!mealType || typeof mealType !== "string") {
            throw new Error("Meal type is required.");
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            throw new Error("Quantity must be a positive whole number.");
        }

        this.#studentID = studentID;
        this.#studentName = studentName;
        this.#mealDate = mealDate;
        this.#mealType = mealType;
        this.#quantity = quantity;
        this.#dietaryNote = dietaryNote;

        this.#status = "Pending";
        this.#paymentStatus = "Pending";
        this.#paymentProcessed = false;
    }

    getStudentID() {
        return this.#studentID;
    }

    getStudentName() {
        return this.#studentName;
    }

    getMealDate() {
        return this.#mealDate;
    }

    getMealType() {
        return this.#mealType;
    }

    getQuantity() {
        return this.#quantity;
    }

    getDietaryNote() {
        return this.#dietaryNote;
    }

    getStatus() {
        return this.#status;
    }

    getPaymentStatus() {
        return this.#paymentStatus;
    }

    getTotalCost() {
        const prices = {
            Breakfast: 10,
            Lunch: 15,
            Dinner: 20
        };

        const price = prices[this.#mealType];

        if (!price) {
            throw new Error(
                `Invalid meal type: ${this.#mealType}. Use Breakfast, Lunch or Dinner.`
            );
        }

        return price * this.#quantity;
    }

    processPayment(diningAccount) {
        if (!diningAccount || typeof diningAccount.payForMeal !== "function") {
            console.log(
                "Payment failed: a valid dining account is required."
            );

            this.#paymentStatus = "Failed";
            this.#status = "Pending";

            return false;
        }

        if (this.#paymentProcessed || this.#paymentStatus === "Successful") {
            console.log("========================================");
            console.log("          DUPLICATE PAYMENT");
            console.log("========================================");
            console.log(
                "This booking has already been paid for."
            );
            console.log(
                "The account will not be charged again."
            );
            console.log("========================================");

            return false;
        }

        const totalCost = this.getTotalCost();

        console.log("========================================");
        console.log("          PROCESSING PAYMENT");
        console.log("========================================");
        console.log(`Meal: ${this.#mealType}`);
        console.log(`Quantity: ${this.#quantity}`);
        console.log(`Total Cost: K${totalCost.toFixed(2)}`);
        console.log(`Account: ${diningAccount.getAccountNumber()}`);
        console.log("========================================");

        /*
          Polymorphism:
          The booking does not determine the account type.
          It simply calls payForMeal().
        */
        const paymentSuccessful = diningAccount.payForMeal(
            totalCost,
            `${this.#mealType} booking`
        );

        if (paymentSuccessful) {
            this.#paymentStatus = "Successful";
            this.#status = "Confirmed";
            this.#paymentProcessed = true;

            console.log("Payment Status: Successful");
            console.log("Booking Status: Confirmed");
            console.log(
                `Remaining Balance: K${diningAccount.getBalance().toFixed(2)}`
            );

            return true;
        }

        this.#paymentStatus = "Failed";
        this.#status = "Pending";

        console.log("Payment Status: Failed");
        console.log("Booking Status: Pending");

        return false;
    }

    displayBooking() {
        console.log("========================================");
        console.log("             MEAL BOOKING");
        console.log("========================================");
        console.log(`Student: ${this.#studentName}`);
        console.log(`Student ID: ${this.#studentID}`);
        console.log(`Meal Date: ${this.#mealDate}`);
        console.log(`Meal: ${this.#mealType}`);
        console.log(`Quantity: ${this.#quantity}`);
        console.log(`Total Cost: K${this.getTotalCost().toFixed(2)}`);
        console.log(`Dietary Note: ${this.#dietaryNote || "None"}`);
        console.log(`Payment Status: ${this.#paymentStatus}`);
        console.log(`Booking Status: ${this.#status}`);
        console.log("========================================");
    }
}

module.exports = MealBooking;