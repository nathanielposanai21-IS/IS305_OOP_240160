const JsonFileRepository = require('./JsonFileRepository');
class ServiceRequestFileRepository extends JsonFileRepository {
  constructor(dataDirectory) { super(`${dataDirectory}/serviceRequests.json`, { idField: 'requestId' }); }
  async findByRequester(userId) { return (await this.loadAll()).filter(record => record.requesterId === userId); }
  async findByTechnician(technicianId) { return (await this.loadAll()).filter(record => record.assignedTechnicianId === technicianId); }
}
module.exports = ServiceRequestFileRepository;
