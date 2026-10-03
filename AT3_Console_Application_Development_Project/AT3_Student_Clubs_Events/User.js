// User class representing a user in the system.

class User {
  #userId;
  #firstName;
  #lastName;
  #email;
  #userType;

  // Define the supported user types as a static property.
  static USER_TYPES = Object.freeze(["Student", "Club Administrator"]);

  // Constructor to initialize a User instance with required properties.
  constructor({
    userId,
    firstName,
    lastName,
    email,
    userType = "Student",
  } = {}) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userType = userType;
    this.validate();
  }

  // Getters and setters for user properties with validation.
  get userId() {
    return this.#userId;
  }
  set userId(value) {
    this.#userId = User.#required(value, "User ID");
  }
  get firstName() {
    return this.#firstName;
  }
  set firstName(value) {
    this.#firstName = User.#required(value, "First name");
  }
  get lastName() {
    return this.#lastName;
  }
  set lastName(value) {
    this.#lastName = User.#required(value, "Last name");
  }
  get email() {
    return this.#email;
  }
  set email(value) {
    this.#email = User.#required(value, "Email").toLowerCase();
  }
  get userType() {
    return this.#userType;
  }
  set userType(value) {
    const type = User.#required(value, "User type");
    if (!User.USER_TYPES.includes(type))
      throw new Error(`Unsupported user type: ${type}`);
    this.#userType = type;
  }

  // Method to get the full name of the user.
  getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  // Method to validate the user's email format.
  validate() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.#email))
      throw new Error("Invalid email address");
    return true;
  }

  // Method to display user information in a formatted string.
  displayInfo() {
    return `${this.#userId} | ${this.getFullName()} | ${this.#email} | ${this.#userType}`;
  }

  // Method to convert the User instance to a JSON representation.
  toJSON() {
    return {
      userId: this.#userId,
      firstName: this.#firstName,
      lastName: this.#lastName,
      email: this.#email,
      userType: this.#userType,
    };
  }

  // Private static method to ensure a value is provided and not empty.
  static #required(value, label) {
    if (typeof value !== "string" || !value.trim())
      throw new Error(`${label} is required`);
    return value.trim();
  }
}

// Export the User class for use in other modules.
module.exports = User;
