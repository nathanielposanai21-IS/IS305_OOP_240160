const JsonFileRepository = require('./JsonFileRepository');
class AuditFileRepository extends JsonFileRepository {
  constructor(dataDirectory, fileName = 'auditLog.json') { super(`${dataDirectory}/${fileName}`, { idField: 'auditId' }); }
  async findByRequest(requestId) { return (await this.loadAll()).filter(record => record.requestId === requestId); }
}
module.exports = AuditFileRepository;
