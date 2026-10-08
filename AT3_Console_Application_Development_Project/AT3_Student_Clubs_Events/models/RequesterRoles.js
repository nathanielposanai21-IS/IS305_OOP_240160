const User = require('../User');

class StudentRequester extends User {
  #programme; #yearLevel;
  constructor(commonData, specialisedData = {}) { super({ ...commonData, userType: 'Student' }); this.#programme = StudentRequester.required(specialisedData.programme, 'Programme'); this.#yearLevel = Number(specialisedData.yearLevel); if (!Number.isInteger(this.#yearLevel) || this.#yearLevel < 1) throw new Error('Year level must be a positive whole number'); }
  get programme() { return this.#programme; } get yearLevel() { return this.#yearLevel; }
  displayInfo() { return `${super.displayInfo()} | ${this.#programme} | Year ${this.#yearLevel}`; }
  toJSON() { return { ...super.toJSON(), extra: { programme: this.#programme, yearLevel: this.#yearLevel } }; }
}

class StaffRequester extends User {
  #department;
  constructor(commonData, specialisedData = {}) { super({ ...commonData, userType: 'Staff' }); this.#department = StaffRequester.required(specialisedData.department, 'Department'); }
  get department() { return this.#department; }
  displayInfo() { return `${super.displayInfo()} | Department: ${this.#department}`; }
  toJSON() { return { ...super.toJSON(), extra: { department: this.#department } }; }
}

class ServiceOfficer extends User {
  #serviceSection;
  constructor(commonData, specialisedData = {}) { super({ ...commonData, userType: 'Service Officer' }); this.#serviceSection = ServiceOfficer.required(specialisedData.serviceSection, 'Service section'); }
  get serviceSection() { return this.#serviceSection; }
  canReviewRequests() { return true; } canAssignTechnicians() { return true; } canCloseRequests() { return true; }
  toJSON() { return { ...super.toJSON(), extra: { serviceSection: this.#serviceSection } }; }
}

class Technician extends User {
  #technicalSpeciality;
  constructor(commonData, specialisedData = {}) { super({ ...commonData, userType: 'Technician' }); this.#technicalSpeciality = Technician.required(specialisedData.technicalSpeciality, 'Technical speciality'); }
  get technicalSpeciality() { return this.#technicalSpeciality; }
  canWorkOn(category) { return this.#technicalSpeciality === 'General' || category.toLowerCase().includes(this.#technicalSpeciality.toLowerCase()); }
  toJSON() { return { ...super.toJSON(), extra: { technicalSpeciality: this.#technicalSpeciality } }; }
}

class ClubAdministrator extends User { constructor(commonData) { super({ ...commonData, userType: 'Club Administrator' }); } }
const roleBase = (value, label) => { if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} is required`); return value.trim(); };
StudentRequester.required = value => roleBase(value, 'Programme'); StaffRequester.required = value => roleBase(value, 'Department'); ServiceOfficer.required = value => roleBase(value, 'Service section'); Technician.required = value => roleBase(value, 'Technical speciality');
module.exports = { StudentRequester, StaffRequester, ServiceOfficer, Technician, ClubAdministrator };
