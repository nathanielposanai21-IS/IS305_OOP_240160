class ServiceRequest {
  #requestId; #requester; #title; #description; #campusLocation; #category; #priority; #status; #dateSubmitted; #dateUpdated; #assignedTechnician; #progressUpdates; #history;

  static CATEGORIES = Object.freeze(['ICT Support', 'Facilities Maintenance', 'Cleaning and Sanitation', 'General Campus Service']);
  static PRIORITIES = Object.freeze(['Low', 'Normal', 'High', 'Urgent']);
  static STATUSES = Object.freeze(['Submitted', 'Reviewed', 'Assigned', 'In Progress', 'Resolved', 'Closed', 'Cancelled']);
  static TRANSITIONS = Object.freeze({ Submitted: ['Reviewed', 'Cancelled'], Reviewed: ['Assigned', 'Cancelled'], Assigned: ['In Progress', 'Cancelled'], 'In Progress': ['Resolved', 'Cancelled'], Resolved: ['Closed'], Closed: [], Cancelled: [] });

  constructor({ requestId, requester, title, description, campusLocation, category, priority = 'Normal', dateSubmitted = new Date() } = {}) {
    this.#requestId = ServiceRequest.#required(requestId, 'Request ID');
    if (!requester || typeof requester.userId !== 'string') throw new Error('A valid requester is required');
    this.#requester = requester; this.#title = ServiceRequest.#required(title, 'Request title'); this.#description = ServiceRequest.#required(description, 'Request description'); this.#campusLocation = ServiceRequest.#required(campusLocation, 'Campus location'); this.#category = ServiceRequest.#choice(category, ServiceRequest.CATEGORIES, 'category'); this.#priority = ServiceRequest.#choice(priority, ServiceRequest.PRIORITIES, 'priority');
    this.#status = 'Submitted'; this.#dateSubmitted = new Date(dateSubmitted); this.#dateUpdated = new Date(this.#dateSubmitted); this.#assignedTechnician = null; this.#progressUpdates = []; this.#history = [];
    this.validate();
  }

  get requestId() { return this.#requestId; } get requester() { return this.#requester; } get title() { return this.#title; } get description() { return this.#description; } get campusLocation() { return this.#campusLocation; } get category() { return this.#category; } get priority() { return this.#priority; } get status() { return this.#status; } get dateSubmitted() { return new Date(this.#dateSubmitted); } get dateUpdated() { return new Date(this.#dateUpdated); } get assignedTechnician() { return this.#assignedTechnician; } get progressUpdates() { return this.#progressUpdates.map(update => ({ ...update })); } get history() { return this.#history.map(entry => ({ ...entry })); }

  validate() { if (!ServiceRequest.CATEGORIES.includes(this.#category)) throw new Error('Unsupported category'); if (!ServiceRequest.PRIORITIES.includes(this.#priority)) throw new Error('Unsupported priority'); if (!ServiceRequest.STATUSES.includes(this.#status)) throw new Error('Unsupported status'); if (Number.isNaN(this.#dateSubmitted.getTime())) throw new Error('Invalid submission date'); return true; }

  updateDetails(changes = {}) {
    if (this.#status !== 'Submitted') throw new Error('Only Submitted requests can be updated');
    if (changes.title !== undefined) this.#title = ServiceRequest.#required(changes.title, 'Request title'); if (changes.description !== undefined) this.#description = ServiceRequest.#required(changes.description, 'Request description'); if (changes.campusLocation !== undefined) this.#campusLocation = ServiceRequest.#required(changes.campusLocation, 'Campus location'); if (changes.category !== undefined) this.#category = ServiceRequest.#choice(changes.category, ServiceRequest.CATEGORIES, 'category'); if (changes.priority !== undefined) this.#priority = ServiceRequest.#choice(changes.priority, ServiceRequest.PRIORITIES, 'priority');
    this.#dateUpdated = new Date(); return this;
  }

  cancelRequest(actor = this.#requester, comment = 'Request cancelled by requester') { if (this.#status === 'Cancelled') throw new Error('Request is already Cancelled'); this.transitionTo('Cancelled', actor, comment); return this; }

  transitionTo(newStatus, actor, comment = '') {
    if (!ServiceRequest.STATUSES.includes(newStatus)) throw new Error(`Unsupported status: ${newStatus}`);
    if (!ServiceRequest.TRANSITIONS[this.#status].includes(newStatus)) throw new Error(`Invalid status transition: ${this.#status} to ${newStatus}`);
    const previousStatus = this.#status; this.#status = newStatus; this.#dateUpdated = new Date();
    this.#history.push({ previousStatus, newStatus, action: `${newStatus} request`, actorId: actor?.userId || actor?.role || 'SYSTEM', actorRole: actor?.userType || actor?.role || 'Unknown', comment, date: new Date(this.#dateUpdated) });
    return this;
  }

  assignTechnician(technician, comment = 'Technician assigned') { if (!technician || typeof technician.userId !== 'string') throw new Error('A valid technician is required'); this.#assignedTechnician = technician; return this.transitionTo('Assigned', technician, comment); }
  setPriority(priority, actor, comment = 'Priority assigned') { this.#priority = ServiceRequest.#choice(priority, ServiceRequest.PRIORITIES, 'priority'); this.#dateUpdated = new Date(); this.#history.push({ previousStatus: this.#status, newStatus: this.#status, action: 'Priority assigned', actorId: actor?.userId || 'SYSTEM', actorRole: actor?.userType || 'Unknown', comment, date: new Date(this.#dateUpdated) }); return this; }
  addProgressUpdate(technician, comment) { if (!this.#assignedTechnician || technician.userId !== this.#assignedTechnician.userId) throw new Error('Only the assigned Technician may update work progress'); if (this.#status !== 'In Progress') throw new Error('Progress can only be recorded while In Progress'); const update = { technicianId: technician.userId, comment: ServiceRequest.#required(comment, 'Progress comment'), date: new Date() }; this.#progressUpdates.push(update); this.#dateUpdated = new Date(); return update; }
  getRequestSummary() { return `${this.#requestId} | ${this.#title} | ${this.#category} | ${this.#priority} | ${this.#status} | ${this.#requester.getFullName()}${this.#assignedTechnician ? ` | Technician: ${this.#assignedTechnician.getFullName()}` : ''}`; }
  calculatePriorityScore() { return ({ Urgent: 40, High: 30, Normal: 15, Low: 5 })[this.#priority]; }
  getTargetResolutionHours() { return ({ Urgent: 8, High: 24, Normal: 72, Low: 120 })[this.#priority]; }
  toJSON() { return { requestId: this.#requestId, requesterId: this.#requester.userId, title: this.#title, description: this.#description, campusLocation: this.#campusLocation, category: this.#category, priority: this.#priority, status: this.#status, assignedTechnicianId: this.#assignedTechnician?.userId || null, dateSubmitted: this.dateSubmitted, dateUpdated: this.dateUpdated, history: this.history, progressUpdates: this.progressUpdates }; }

  static #required(value, label) { if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} is required`); return value.trim(); }
  static #choice(value, allowed, label) { if (!allowed.includes(value)) throw new Error(`Unsupported ${label}: ${value}`); return value; }
}
module.exports = ServiceRequest;
