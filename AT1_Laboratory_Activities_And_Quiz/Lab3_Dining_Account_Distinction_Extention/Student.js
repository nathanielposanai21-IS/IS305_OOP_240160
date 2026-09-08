class Student {
    #studentID;
    #firstName;
    #lastName;

    constructor(studentID, firstName, lastName) {
        this.#studentID = studentID;
        this.#firstName = firstName;
        this.#lastName = lastName;
    }

    // Student ID Getter
    get studentID() {
        return this.#studentID;
    }

    // First Name Getter
    get firstName() {
        return this.#firstName;
    }

    // Last Name Getter
    get lastName() {
        return this.#lastName;
    }

    // Student ID Setter
    set studentID(value) {
        if (!value || value.trim() === "") {
            throw new Error("Student ID is required");
        }
        this.#studentID = value.trim();
    }

    // First Name Setter
    set firstName(value) {
        if (!value || value.trim() === "") {
            throw new Error("First Name is required");
        }
        this.#firstName = value.trim();
    }

    // Last Name Setter
    set lastName(value) {
        if (!value || value.trim() === "") {
            throw new Error("Last Name is required");
        }
        this.#lastName = value.trim();
    }

    // Return Student's Full Name
    getFullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    // Display student information
    displayInfo() {
        console.log("========================================");
        console.log("             STUDENT DETAILS");
        console.log("========================================");
        console.log(`Student ID: ${this.#studentID}`);
        console.log(`Student Name: ${this.getFullName()}`);
        console.log("========================================");
    }
}

module.exports = Student;