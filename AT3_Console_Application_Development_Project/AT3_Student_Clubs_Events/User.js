class User {
  #userId;
  #firstName;
  #lastName;
  #email;
  #userType;

  static USER_TYPES = Object.freeze(['Student', 'Staff', 'Service Officer', 'Technician', 'Club Administrator']);

  constructor({ userId, firstName, lastName, email, userType = 'Student' } = {}) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userType = userType;
    this.validate();
  }

  get userId() { return this.#userId; }
  set userId(value) { this.#userId = User.#required(value, 'User ID'); }
  get firstName() { return this.#firstName; }
  set firstName(value) { this.#firstName = User.#required(value, 'First name'); }
  get lastName() { return this.#lastName; }
  set lastName(value) { this.#lastName = User.#required(value, 'Last name'); }
  get email() { return this.#email; }
  set email(value) { this.#email = User.#required(value, 'Email').toLowerCase(); }
  get userType() { return this.#userType; }
  set userType(value) {
    const type = User.#required(value, 'User type');
    if (!User.USER_TYPES.includes(type)) throw new Error(`Unsupported user type: ${type}`);
    this.#userType = type;
  }

  getFullName() { return `${this.#firstName} ${this.#lastName}`; }

  validate() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.#email)) throw new Error('Invalid email address');
    return true;
  }

  displayInfo() { return `${this.#userId} | ${this.getFullName()} | ${this.#email} | ${this.#userType}`; }

  toJSON() { return { userId: this.#userId, firstName: this.#firstName, lastName: this.#lastName, email: this.#email, userType: this.#userType }; }

  static #required(value, label) { if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} is required`); return value.trim(); }
}

module.exports = User;
