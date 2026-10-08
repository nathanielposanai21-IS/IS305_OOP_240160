const crypto = require('crypto');
class AuditLogger {
  constructor(repository) { this.repository = repository; }
  async record({ actorId = 'SYSTEM', action, requestId = null, description, result = 'Success' }) { const entry = { auditId: crypto.randomUUID(), actorId, action, requestId, description, dateTime: new Date().toISOString(), result }; return this.repository.create(entry); }
  async recordUserRegistration(user, actorId = user.userId) { return this.record({ actorId, action: 'User registration', description: `Registered ${user.userId}` }); }
  async recordRequestAction(request, action, actorId, description, result = 'Success') { return this.record({ actorId, action, requestId: request.requestId, description, result }); }
}
module.exports = AuditLogger;
