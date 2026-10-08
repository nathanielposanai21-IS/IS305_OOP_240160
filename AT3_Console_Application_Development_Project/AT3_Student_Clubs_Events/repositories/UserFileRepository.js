const JsonFileRepository = require('./JsonFileRepository');
class UserFileRepository extends JsonFileRepository {
  constructor(dataDirectory) { super(`${dataDirectory}/users.json`, { idField: 'userId' }); }
  async findByRequester(userId) { return this.findById(userId); }
}
module.exports = UserFileRepository;
