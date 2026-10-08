const fs = require('fs/promises');
const path = require('path');

class JsonFileRepository {
  constructor(filePath, { idField = 'id' } = {}) { this.filePath = filePath; this.idField = idField; }
  async ensureFile() { await fs.mkdir(path.dirname(this.filePath), { recursive: true }); try { await fs.access(this.filePath); } catch (error) { if (error.code !== 'ENOENT') throw new Error(`Unable to access ${this.filePath}: ${error.message}`); await this.saveAll([]); } }
  async loadAll() { await this.ensureFile(); let raw; try { raw = await fs.readFile(this.filePath, 'utf8'); } catch (error) { throw new Error(`Unable to read ${this.filePath}: ${error.message}`); } if (!raw.trim()) return []; try { const records = JSON.parse(raw); if (!Array.isArray(records)) throw new Error('JSON root must be an array'); return records; } catch (error) { throw new Error(`Unable to parse ${this.filePath}: ${error.message}`); } }
  async saveAll(records) { if (!Array.isArray(records)) throw new Error('Records must be an array'); await fs.mkdir(path.dirname(this.filePath), { recursive: true }); try { await fs.writeFile(this.filePath, `${JSON.stringify(records, null, 2)}\n`, 'utf8'); } catch (error) { throw new Error(`Unable to write ${this.filePath}: ${error.message}`); } return records; }
  async create(record) { const records = await this.loadAll(); if (this.idField && records.some(existing => existing[this.idField] === record[this.idField])) throw new Error(`Duplicate identifier: ${record[this.idField]}`); records.push(record); await this.saveAll(records); return record; }
  async findById(id) { return (await this.loadAll()).find(record => record[this.idField] === id); }
  async update(id, changes) { const records = await this.loadAll(); const index = records.findIndex(record => record[this.idField] === id); if (index < 0) throw new Error(`Record not found: ${id}`); records[index] = { ...records[index], ...changes }; await this.saveAll(records); return records[index]; }
}
module.exports = JsonFileRepository;
