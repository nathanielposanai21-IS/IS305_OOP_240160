class MealBooking {

// Constructor initializes a new MealBooking object
// with the student's booking details and default status.
    constructor(studentID, studentName, mealDate, mealType, quantity, dietaryNote) {

// Store the booking information entered by the user.
        this.studentID = studentID;
        this.studentName = studentName;
        this.mealDate = mealDate;
        this.mealType = mealType.charAt(0).toUpperCase() + mealType.slice(1).toLowerCase(); // Capitalize first letter
        this.quantity = Number(quantity);
        this.dietaryNote = dietaryNote;

// Every new booking starts with a Pending status.
        this.bookingStatus = "Pending";

// Store the meal prices for each meal type.
        this.mealPrices = {
            Breakfast: 10,
            Lunch: 15,
            Dinner: 20
        };
    }

// Getter methods return the values of private booking properties.
    // Returns the student's ID.
    getStudentID() {
        return this.studentID;
    }

    // Returns the student's name.
    getStudentName() {
        return this.studentName;
    }

    // Returns the meal date.
    getMealDate() {
        return this.mealDate;
    }

    // Returns the selected meal type.
    getMealType() {
        return this.mealType;
    }

    // Returns the booking quantity.
    getQuantity() {
        return this.quantity;
    }

    // Returns the dietary note.
    getDietaryNote() {
        return this.dietaryNote;
    }

    // Returns the current booking status.
    getBookingStatus() {
        return this.bookingStatus;
    }

// Setter methods update the booking information if required.
    // Updates the student's ID.
    setStudentID(studentID) {
        this.studentID = studentID;
    }

    // Updates the student's name.
    setStudentName(studentName) {
        this.studentName = studentName;
    }

    // Updates the meal date.
    setMealDate(mealDate) {
        this.mealDate = mealDate;
    }

    // Updates the meal type.
    setMealType(mealType) {
        this.mealType = mealType;
    }

    // Updates the booking quantity.
    setQuantity(quantity) {
        this.quantity = Number(quantity);
    }

    // Updates the dietary note.
    setDietaryNote(note) {
        this.dietaryNote = note;
    }

    // Validates the booking information to ensure all required fields are filled correctly.
    validate() {

        // Check if the student ID, name, meal date, meal type, and quantity are valid.
        if (!this.studentID.trim()) {
            throw new Error("Student ID is required.");
        }

        if (!this.studentName.trim()) {
            throw new Error("Student Name is required.");
        }

        if (!this.mealDate.trim()) {
            throw new Error("Meal Date is required.");
        }

        const validMeals = ["Breakfast", "Lunch", "Dinner"];

        if (!validMeals.includes(this.mealType)) {
            throw new Error("Meal Type must be Breakfast, Lunch or Dinner.");
        }

        if (isNaN(this.quantity) || this.quantity < 1) {
            throw new Error("Quantity must be at least 1.");
        }

        return true;
    }

    // Calculates the total cost of the booking based on meal type and quantity.
    calculateTotal() {
        return this.mealPrices[this.mealType] * this.quantity;
    }

    confirmBooking() {
        this.bookingStatus = "Confirmed";
    }

    cancelBooking() {
        this.bookingStatus = "Cancelled";
    }

    // Generates a summary of the booking details for display or confirmation.
    getSummary() {

        return `
========================================
          BOOKING CREATED
========================================
Student: ${this.studentName} (${this.studentID})
Meal Date: ${this.mealDate}
Meal Type: ${this.mealType}
Quantity: ${this.quantity}
Dietary Note: ${this.dietaryNote || "None"}
Status: ${this.bookingStatus}
Total Cost: K${this.calculateTotal().toFixed(2)}
========================================
`;
    }
}

// Export the MealBooking class for use in other modules.
module.exports = MealBooking;