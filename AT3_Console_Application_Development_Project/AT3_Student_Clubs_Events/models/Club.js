// models/Club.js

class Club {
  static CATEGORIES = Object.freeze([
    "Academic",
    "Sports",
    "Culture",
    "Technology",
    "Religious",
    "Social",
  ]);
  #clubId;
  #name;
  #description;
  #category;
  #presidentId;
  #status;
  constructor({
    clubId,
    name,
    description,
    category,
    presidentId,
    status = "Active",
  } = {}) {
    this.#clubId = Club.required(clubId, "Club ID");
    this.#name = Club.required(name, "Club name");
    this.#description = Club.required(description, "Club description");
    this.#category = Club.choice(category, Club.CATEGORIES, "club category");
    this.#presidentId = Club.required(presidentId, "President ID");
    this.#status = status;
    if (!["Active", "Inactive"].includes(status))
      throw new Error("Unsupported club status");
  }
  get clubId() {
    return this.#clubId;
  }
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }
  get category() {
    return this.#category;
  }
  get presidentId() {
    return this.#presidentId;
  }
  get status() {
    return this.#status;
  }
  toJSON() {
    return {
      clubId: this.#clubId,
      name: this.#name,
      description: this.#description,
      category: this.#category,
      presidentId: this.#presidentId,
      status: this.#status,
    };
  }
  static required(v, l) {
    if (typeof v !== "string" || !v.trim()) throw new Error(`${l} is required`);
    return v.trim();
  }
  static choice(v, a, l) {
    if (!a.includes(v)) throw new Error(`Unsupported ${l}: ${v}`);
    return v;
  }
}
module.exports = Club;
