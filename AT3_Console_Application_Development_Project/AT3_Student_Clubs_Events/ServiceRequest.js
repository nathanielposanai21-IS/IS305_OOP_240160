class ServiceRequest {
  #requestId;
  #requester;
  #title;
  #description;
  #campusLocation;
  #category;
  #priority;
  #status;
  #dateSubmitted;
  #dateUpdated;

  static CATEGORIES = Object.freeze([
    "ICT Support",
    "Facilities Maintenance",
    "Cleaning and Sanitation",
    "General Campus Service",
  ]);
  static PRIORITIES = Object.freeze(["Low", "Normal", "High", "Urgent"]);
  static STATUSES = Object.freeze(["Submitted", "Cancelled"]);

  constructor({
    requestId,
    requester,
    title,
    description,
    campusLocation,
    category,
    priority = "Normal",
    dateSubmitted = new Date(),
  } = {}) {
    this.#requestId = ServiceRequest.#required(requestId, "Request ID");
    if (!requester || typeof requester.userId !== "string")
      throw new Error("A valid requester is required");
    this.#requester = requester;
    this.#title = ServiceRequest.#required(title, "Request title");
    this.#description = ServiceRequest.#required(
      description,
      "Request description",
    );
    this.#campusLocation = ServiceRequest.#required(
      campusLocation,
      "Campus location",
    );
    this.#category = ServiceRequest.#choice(
      category,
      ServiceRequest.CATEGORIES,
      "category",
    );
    this.#priority = ServiceRequest.#choice(
      priority,
      ServiceRequest.PRIORITIES,
      "priority",
    );
    this.#status = "Submitted";
    this.#dateSubmitted = new Date(dateSubmitted);
    this.#dateUpdated = new Date(this.#dateSubmitted);
    this.validate();
  }

  get requestId() {
    return this.#requestId;
  }
  get requester() {
    return this.#requester;
  }
  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
  get campusLocation() {
    return this.#campusLocation;
  }
  get category() {
    return this.#category;
  }
  get priority() {
    return this.#priority;
  }
  get status() {
    return this.#status;
  }
  get dateSubmitted() {
    return new Date(this.#dateSubmitted);
  }
  get dateUpdated() {
    return new Date(this.#dateUpdated);
  }

  validate() {
    if (!ServiceRequest.CATEGORIES.includes(this.#category))
      throw new Error("Unsupported category");
    if (!ServiceRequest.PRIORITIES.includes(this.#priority))
      throw new Error("Unsupported priority");
    if (!ServiceRequest.STATUSES.includes(this.#status))
      throw new Error("Unsupported status");
    if (Number.isNaN(this.#dateSubmitted.getTime()))
      throw new Error("Invalid submission date");
    return true;
  }

  updateDetails(changes = {}) {
    if (this.#status === "Cancelled")
      throw new Error("Cancelled requests cannot be updated");
    if (changes.title !== undefined)
      this.#title = ServiceRequest.#required(changes.title, "Request title");
    if (changes.description !== undefined)
      this.#description = ServiceRequest.#required(
        changes.description,
        "Request description",
      );
    if (changes.campusLocation !== undefined)
      this.#campusLocation = ServiceRequest.#required(
        changes.campusLocation,
        "Campus location",
      );
    if (changes.category !== undefined)
      this.#category = ServiceRequest.#choice(
        changes.category,
        ServiceRequest.CATEGORIES,
        "category",
      );
    if (changes.priority !== undefined)
      this.#priority = ServiceRequest.#choice(
        changes.priority,
        ServiceRequest.PRIORITIES,
        "priority",
      );
    this.#dateUpdated = new Date();
    return this;
  }

  cancelRequest() {
    if (this.#status === "Cancelled")
      throw new Error("Request is already Cancelled");
    this.#status = "Cancelled";
    this.#dateUpdated = new Date();
    return this;
  }

  getRequestSummary() {
    return `${this.#requestId} | ${this.#title} | ${this.#category} | ${this.#priority} | ${this.#status} | ${this.#requester.getFullName()}`;
  }

  toJSON() {
    return {
      requestId: this.#requestId,
      requesterId: this.#requester.userId,
      title: this.#title,
      description: this.#description,
      campusLocation: this.#campusLocation,
      category: this.#category,
      priority: this.#priority,
      status: this.#status,
      dateSubmitted: this.dateSubmitted,
      dateUpdated: this.dateUpdated,
    };
  }

  static #required(value, label) {
    if (typeof value !== "string" || !value.trim())
      throw new Error(`${label} is required`);
    return value.trim();
  }
  static #choice(value, allowed, label) {
    if (!allowed.includes(value))
      throw new Error(`Unsupported ${label}: ${value}`);
    return value;
  }
}

module.exports = ServiceRequest;
