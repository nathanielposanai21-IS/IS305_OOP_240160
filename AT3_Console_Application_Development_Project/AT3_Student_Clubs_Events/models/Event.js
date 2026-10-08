class Event {
  static STATUSES = Object.freeze(['Scheduled', 'Cancelled', 'Completed']);
  #eventId; #clubId; #name; #description; #date; #time; #location; #capacity; #status;
  constructor({ eventId, clubId, name, description, date, time, location, capacity, status = 'Scheduled' } = {}) {
    this.#eventId = Event.required(eventId, 'Event ID'); this.#clubId = Event.required(clubId, 'Club ID'); this.#name = Event.required(name, 'Event name'); this.#description = Event.required(description, 'Event description'); this.#date = Event.required(date, 'Event date'); this.#time = Event.required(time, 'Event time'); this.#location = Event.required(location, 'Event location');
    this.#capacity = Number(capacity); if (!Number.isInteger(this.#capacity) || this.#capacity < 1) throw new Error('Capacity must be a positive whole number');
    if (!Event.STATUSES.includes(status)) throw new Error(`Unsupported event status: ${status}`); this.#status = status;
  }
  get eventId() { return this.#eventId; } get clubId() { return this.#clubId; } get name() { return this.#name; } get description() { return this.#description; } get date() { return this.#date; } get time() { return this.#time; } get location() { return this.#location; } get capacity() { return this.#capacity; } get status() { return this.#status; }
  cancel() { if (this.#status === 'Completed') throw new Error('Completed events cannot be cancelled'); this.#status = 'Cancelled'; return this; }
  complete() { if (this.#status === 'Cancelled') throw new Error('Cancelled events cannot be completed'); this.#status = 'Completed'; return this; }
  toJSON() { return { eventId: this.#eventId, clubId: this.#clubId, name: this.#name, description: this.#description, date: this.#date, time: this.#time, location: this.#location, capacity: this.#capacity, status: this.#status }; }
  static required(v, l) { if (typeof v !== 'string' || !v.trim()) throw new Error(`${l} is required`); return v.trim(); }
}
module.exports = Event;
