const ServiceRequest = require("../ServiceRequest");

class ICTSupportRequest extends ServiceRequest {
  #deviceType;
  #systemName;
  #faultType;
  #networkImpact;
  constructor(commonRequestData, specialisedData = {}) {
    super({ ...commonRequestData, category: "ICT Support" });
    this.#deviceType = required(specialisedData.deviceType, "Device type");
    this.#systemName = required(specialisedData.systemName, "System name");
    this.#faultType = required(specialisedData.faultType, "Fault type");
    this.#networkImpact = choice(
      specialisedData.networkImpact,
      ["None", "Local", "Campus-wide"],
      "network impact",
    );
  }
  get deviceType() {
    return this.#deviceType;
  }
  get systemName() {
    return this.#systemName;
  }
  get faultType() {
    return this.#faultType;
  }
  get networkImpact() {
    return this.#networkImpact;
  }
  getRequestSummary() {
    return `${super.getRequestSummary()} | Device: ${this.#deviceType} | System: ${this.#systemName} | Fault: ${this.#faultType} | Network: ${this.#networkImpact}`;
  }
  calculatePriorityScore() {
    return (
      { None: 10, Local: 30, "Campus-wide": 60 }[this.#networkImpact] +
      { Urgent: 40, High: 30, Normal: 15, Low: 5 }[this.priority]
    );
  }
  getTargetResolutionHours() {
    return this.networkImpact === "Campus-wide"
      ? 4
      : this.priority === "Urgent"
        ? 8
        : 24;
  }
}

class MaintenanceRequest extends ServiceRequest {
  #building;
  #roomNumber;
  #hazardLevel;
  #equipmentAffected;
  constructor(commonRequestData, specialisedData = {}) {
    super({ ...commonRequestData, category: "Facilities Maintenance" });
    this.#building = required(specialisedData.building, "Building");
    this.#roomNumber = required(specialisedData.roomNumber, "Room number");
    this.#hazardLevel = choice(
      specialisedData.hazardLevel,
      ["Low", "Medium", "High"],
      "hazard level",
    );
    this.#equipmentAffected = required(
      specialisedData.equipmentAffected,
      "Equipment affected",
    );
  }
  get building() {
    return this.#building;
  }
  get roomNumber() {
    return this.#roomNumber;
  }
  get hazardLevel() {
    return this.#hazardLevel;
  }
  get equipmentAffected() {
    return this.#equipmentAffected;
  }
  getRequestSummary() {
    return `${super.getRequestSummary()} | Building: ${this.#building} | Room: ${this.#roomNumber} | Hazard: ${this.#hazardLevel} | Equipment: ${this.#equipmentAffected}`;
  }
  calculatePriorityScore() {
    return (
      { Low: 5, Medium: 25, High: 60 }[this.#hazardLevel] +
      { Urgent: 40, High: 30, Normal: 15, Low: 5 }[this.priority]
    );
  }
  getTargetResolutionHours() {
    return this.#hazardLevel === "High" ? 4 : 48;
  }
}

class CleaningRequest extends ServiceRequest {
  #cleaningArea;
  #hygieneRisk;
  #serviceType;
  #preferredServiceTime;
  constructor(commonRequestData, specialisedData = {}) {
    super({ ...commonRequestData, category: "Cleaning and Sanitation" });
    this.#cleaningArea = required(
      specialisedData.cleaningArea,
      "Cleaning area",
    );
    this.#hygieneRisk = choice(
      specialisedData.hygieneRisk,
      ["Low", "Medium", "High"],
      "hygiene risk",
    );
    this.#serviceType = required(specialisedData.serviceType, "Service type");
    this.#preferredServiceTime = required(
      specialisedData.preferredServiceTime,
      "Preferred service time",
    );
  }
  get cleaningArea() {
    return this.#cleaningArea;
  }
  get hygieneRisk() {
    return this.#hygieneRisk;
  }
  get serviceType() {
    return this.#serviceType;
  }
  get preferredServiceTime() {
    return this.#preferredServiceTime;
  }
  getRequestSummary() {
    return `${super.getRequestSummary()} | Area: ${this.#cleaningArea} | Risk: ${this.#hygieneRisk} | Service: ${this.#serviceType} | Preferred: ${this.#preferredServiceTime}`;
  }
  calculatePriorityScore() {
    return (
      { Low: 5, Medium: 25, High: 60 }[this.#hygieneRisk] +
      { Urgent: 40, High: 30, Normal: 15, Low: 5 }[this.priority]
    );
  }
  getTargetResolutionHours() {
    return this.#hygieneRisk === "High" ? 2 : 24;
  }
}

function required(value, label) {
  if (typeof value !== "string" || !value.trim())
    throw new Error(`${label} is required`);
  return value.trim();
}
function choice(value, allowed, label) {
  if (!allowed.includes(value))
    throw new Error(`Unsupported ${label}: ${value}`);
  return value;
}
module.exports = { ICTSupportRequest, MaintenanceRequest, CleaningRequest };
