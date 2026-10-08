class ServiceRequestManager {
  #users = [];
  #requests = [];

  registerUser(user) { if (this.#users.some(existing => existing.userId === user.userId)) throw new Error(`Duplicate user ID: ${user.userId}`); this.#users.push(user); return user; }
  findUserById(userId) { return this.#users.find(user => user.userId === userId); }
  registerTechnician(technician) { return this.registerUser(technician); }
  submitRequest(request) { if (this.#requests.some(existing => existing.requestId === request.requestId)) throw new Error(`Duplicate request ID: ${request.requestId}`); if (!this.findUserById(request.requester.userId)) throw new Error('Requester must be registered before submitting a request'); this.#requests.push(request); return request; }
  findRequestById(requestId) { return this.#requests.find(request => request.requestId === requestId); }
  getRequestsByUser(userId) { return this.#requests.filter(request => request.requester.userId === userId); }
  getAllRequests() { return [...this.#requests]; }

  updateRequest(requestId, userId, changes) { const request = this.#getOwnedRequest(requestId, userId); return request.updateDetails(changes); }
  cancelRequest(requestId, userId) { const request = this.#getOwnedRequest(requestId, userId); return request.cancelRequest(this.findUserById(userId)); }

  reviewRequest(requestId, officer, comment = 'Request reviewed') { this.#requireOfficer(officer); const request = this.#getRequest(requestId); return request.transitionTo('Reviewed', officer, comment); }
  assignTechnician(requestId, officer, technicianId, priority, comment = 'Technician assigned') { this.#requireOfficer(officer); const request = this.#getRequest(requestId); const technician = this.findUserById(technicianId); if (!technician || technician.userType !== 'Technician') throw new Error('A registered Technician is required'); if (priority) request.setPriority(priority, officer, 'Priority assigned during review'); return request.assignTechnician(technician, comment); }
  startWork(requestId, technician, comment = 'Technician started work') { this.#requireTechnician(technician); const request = this.#getRequest(requestId); this.#requireAssigned(request, technician); return request.transitionTo('In Progress', technician, comment); }
  addProgressUpdate(requestId, technician, comment) { this.#requireTechnician(technician); const request = this.#getRequest(requestId); this.#requireAssigned(request, technician); return request.addProgressUpdate(technician, comment); }
  resolveRequest(requestId, technician, comment = 'Work resolved') { this.#requireTechnician(technician); const request = this.#getRequest(requestId); this.#requireAssigned(request, technician); return request.transitionTo('Resolved', technician, comment); }
  closeRequest(requestId, officer, comment = 'Service Officer verified and closed request') { this.#requireOfficer(officer); const request = this.#getRequest(requestId); return request.transitionTo('Closed', officer, comment); }

  searchRequests(searchText) { const query = String(searchText || '').trim().toLowerCase(); if (!query) return []; return this.#requests.filter(request => [request.requestId, request.title, request.description, request.campusLocation, request.category, request.priority, request.status].some(value => String(value).toLowerCase().includes(query))); }
  filterRequests({ category, status, priority, technicianId } = {}) { return this.#requests.filter(request => (!category || request.category === category) && (!status || request.status === status) && (!priority || request.priority === priority) && (!technicianId || request.assignedTechnician?.userId === technicianId)); }
  sortRequests(requests = this.#requests, sortBy = 'dateSubmitted', direction = 'asc') { const factor = direction === 'desc' ? -1 : 1; return [...requests].sort((a, b) => { const left = sortBy === 'priority' ? a.calculatePriorityScore() : a.dateSubmitted.getTime(); const right = sortBy === 'priority' ? b.calculatePriorityScore() : b.dateSubmitted.getTime(); return (left - right) * factor; }); }
  queryRequests({ searchText, category, status, priority, technicianId, sortBy = 'dateSubmitted', direction = 'asc' } = {}) { let results = searchText ? this.searchRequests(searchText) : this.#requests; results = results.filter(request => (!category || request.category === category) && (!status || request.status === status) && (!priority || request.priority === priority) && (!technicianId || request.assignedTechnician?.userId === technicianId)); return this.sortRequests(results, sortBy, direction); }
  getRequestSummaryByStatus() { return this.#requests.reduce((summary, request) => { summary[request.status] = (summary[request.status] || 0) + 1; return summary; }, { Submitted: 0, Cancelled: 0 }); }

  #getRequest(requestId) { const request = this.findRequestById(requestId); if (!request) throw new Error(`Request not found: ${requestId}`); return request; }
  #getOwnedRequest(requestId, userId) { const request = this.#getRequest(requestId); if (request.requester.userId !== userId) throw new Error('You may only modify your own request'); return request; }
  #requireOfficer(actor) { if (!actor || actor.userType !== 'Service Officer') throw new Error('Only a Service Officer may perform this action'); }
  #requireTechnician(actor) { if (!actor || actor.userType !== 'Technician') throw new Error('Only a Technician may perform this action'); }
  #requireAssigned(request, technician) { if (!request.assignedTechnician || request.assignedTechnician.userId !== technician.userId) throw new Error('Only the assigned Technician may perform this action'); }
}
module.exports = ServiceRequestManager;
