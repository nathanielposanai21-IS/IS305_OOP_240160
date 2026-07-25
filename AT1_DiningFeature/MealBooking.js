class MealBooking {
    constructor(studentID, studentName, mealDate, mealType, quantity, dietaryNote) {
        this.studentID = studentID;
        this.studentName = studentName;
        this.mealDate = mealDate;
        this.mealType = mealType.charAt(0).toUpperCase() + mealType.slice(1).toLowerCase(); // Capitalize first letter
        this.quantity = Number(quantity);
        this.dietaryNote = dietaryNote;
        this.bookingStatus = "Pending";

        this.mealPrices = {
            Breakfast: 10,
            Lunch: 15,
            Dinner: 20
        };
    }

    // Getters
    getStudentID() {
        return this.studentID;
    }

    getStudentName() {
        return this.studentName;
    }

    getMealDate() {
        return this.mealDate;
    }

    getMealType() {
        return this.mealType;
    }

    getQuantity() {
        return this.quantity;
    }

    getDietaryNote() {
        return this.dietaryNote;
    }

    getBookingStatus() {
        return this.bookingStatus;
    }

    // Setters
    setStudentID(studentID) {
        this.studentID = studentID;
    }

    setStudentName(studentName) {
        this.studentName = studentName;
    }

    setMealDate(mealDate) {
        this.mealDate = mealDate;
    }

    setMealType(mealType) {
        this.mealType = mealType;
    }

    setQuantity(quantity) {
        this.quantity = Number(quantity);
    }

    setDietaryNote(note) {
        this.dietaryNote = note;
    }

    validate() {

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

    calculateTotal() {
        return this.mealPrices[this.mealType] * this.quantity;
    }

    confirmBooking() {
        this.bookingStatus = "Confirmed";
    }

    cancelBooking() {
        this.bookingStatus = "Cancelled";
    }

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

module.exports = MealBooking;