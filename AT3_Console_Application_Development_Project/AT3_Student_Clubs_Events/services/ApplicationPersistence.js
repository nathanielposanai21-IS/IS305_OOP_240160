const User = require('../User');
const { StudentRequester, StaffRequester, ServiceOfficer, Technician, ClubAdministrator } = require('../models/RequesterRoles');
const ServiceRequestFactory = require('./ServiceRequestFactory');

class ApplicationPersistence {
  constructor({ userRepository, requestRepository, historyRepository, auditLogger }) { this.userRepository = userRepository; this.requestRepository = requestRepository; this.historyRepository = historyRepository; this.auditLogger = auditLogger; }
  async loadUsers() { const records = await this.userRepository.loadAll(); return new Map(records.map(record => [record.userId, ApplicationPersistence.userFromData(record)])); }
  async loadRequests(users) { const records = await this.requestRepository.loadAll(); return records.map(record => ServiceRequestFactory.createFromData(record, users)); }
  async saveUser(user, actorId = user.userId) { const saved = await this.userRepository.create(user.toJSON()); await this.auditLogger.recordUserRegistration(user, actorId); return saved; }
  async saveRequest(request, actorId = request.requester.userId) { const saved = await this.requestRepository.create(request.toJSON()); await this.saveHistory(request); await this.auditLogger.recordRequestAction(request, 'Request creation', actorId, 'Request saved to JSON'); return saved; }
  async updateRequest(request, actorId, action = 'Request update') { const saved = await this.requestRepository.update(request.requestId, request.toJSON()); await this.saveHistory(request); await this.auditLogger.recordRequestAction(request, action, actorId, `${action} saved to JSON`); return saved; }
  async saveHistory(request) { const existing = await this.historyRepository.loadAll(); const history = request.history.map((entry, index) => ({ historyId: `${request.requestId}-${index + 1}`, requestId: request.requestId, ...entry, date: new Date(entry.date).toISOString() })); await this.historyRepository.saveAll([...existing.filter(entry => entry.requestId !== request.requestId), ...history]); }
  static userFromData(record) { const common = { userId: record.userId, firstName: record.firstName, lastName: record.lastName, email: record.email }; const extra = record.extra || {}; if (record.userType === 'Student') return extra.programme ? new StudentRequester(common, extra) : new User(record); if (record.userType === 'Staff') return new StaffRequester(common, extra); if (record.userType === 'Service Officer') return new ServiceOfficer(common, extra); if (record.userType === 'Technician') return new Technician(common, extra); if (record.userType === 'Club Administrator') return new ClubAdministrator(common); return new User(record); }
}
module.exports = ApplicationPersistence;
