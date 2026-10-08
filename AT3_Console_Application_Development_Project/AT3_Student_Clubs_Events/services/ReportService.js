class ReportService {
  constructor(requests = []) { this.requests = requests; }
  groupedBy(field) { return this.requests.reduce((result, request) => { const value = request[field]; result[value] = (result[value] || 0) + 1; return result; }, {}); }
  byStatus() { return this.groupedBy('status'); }
  byCategory() { return this.groupedBy('category'); }
  byPriority() { return this.groupedBy('priority'); }
  urgentRequests() { return this.requests.filter(request => request.priority === 'Urgent'); }
  overdueRequests(asOf = new Date()) { return this.requests.filter(request => !['Closed', 'Cancelled'].includes(request.status) && (asOf - request.dateSubmitted) / 36e5 > request.getTargetResolutionHours()); }
  assignedToTechnician() { return this.requests.filter(request => request.assignedTechnician).reduce((result, request) => { const id = request.assignedTechnician.userId; (result[id] ||= []).push(request); return result; }, {}); }
  completedByTechnician() { return this.requests.filter(request => request.status === 'Closed' && request.assignedTechnician).reduce((result, request) => { const id = request.assignedTechnician.userId; result[id] = (result[id] || 0) + 1; return result; }, {}); }
  averageResolutionHours() { const completed = this.requests.filter(request => ['Resolved', 'Closed'].includes(request.status)); if (!completed.length) return 0; const total = completed.reduce((sum, request) => { const resolution = request.history.find(entry => entry.newStatus === 'Resolved'); return sum + (resolution ? (new Date(resolution.date) - request.dateSubmitted) / 36e5 : 0); }, 0); return Number((total / completed.length).toFixed(2)); }
  volumeByLocation() { return this.groupedBy('campusLocation'); }
  all() { return { byStatus: this.byStatus(), byCategory: this.byCategory(), byPriority: this.byPriority(), urgent: this.urgentRequests(), overdue: this.overdueRequests(), assignedToTechnician: this.assignedToTechnician(), completedByTechnician: this.completedByTechnician(), averageResolutionHours: this.averageResolutionHours(), volumeByLocation: this.volumeByLocation() }; }
}
module.exports = ReportService;
