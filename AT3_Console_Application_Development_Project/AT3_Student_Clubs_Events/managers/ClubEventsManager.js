class ClubEventsManager {
  #clubs = []; #events = []; #memberships = []; #registrations = []; #attendance = []; #announcements = [];
  registerClub(club) { if (this.#clubs.some(c => c.clubId === club.clubId)) throw new Error('Duplicate club ID'); this.#clubs.push(club); return club; }
  getClubs() { return [...this.#clubs]; }
  findClub(clubId) { return this.#clubs.find(c => c.clubId === clubId); }
  joinClub(studentId, clubId) { if (!this.findClub(clubId)) throw new Error('Club not found'); if (this.#memberships.some(m => m.studentId === studentId && m.clubId === clubId)) throw new Error('Student is already a member of this club'); const membership = { studentId, clubId, joinedAt: new Date() }; this.#memberships.push(membership); return membership; }
  leaveClub(studentId, clubId) { const index = this.#memberships.findIndex(m => m.studentId === studentId && m.clubId === clubId); if (index < 0) throw new Error('Membership not found'); return this.#memberships.splice(index, 1)[0]; }
  getMemberships(studentId) { return this.#memberships.filter(m => m.studentId === studentId); }
  createEvent(event) { if (!this.findClub(event.clubId)) throw new Error('Club not found'); if (this.#events.some(e => e.eventId === event.eventId)) throw new Error('Duplicate event ID'); this.#events.push(event); return event; }
  getEvents({ clubId, status } = {}) { return this.#events.filter(e => (!clubId || e.clubId === clubId) && (!status || e.status === status)); }
  findEvent(eventId) { return this.#events.find(e => e.eventId === eventId); }
  registerForEvent(studentId, eventId) { const event = this.findEvent(eventId); if (!event) throw new Error('Event not found'); if (event.status !== 'Scheduled') throw new Error('Registration is only available for scheduled events'); if (this.#registrations.some(r => r.studentId === studentId && r.eventId === eventId)) throw new Error('Student is already registered for this event'); if (this.#registrations.filter(r => r.eventId === eventId).length >= event.capacity) throw new Error('Event capacity has been reached'); const registration = { studentId, eventId, registeredAt: new Date() }; this.#registrations.push(registration); return registration; }
  cancelRegistration(studentId, eventId) { const index = this.#registrations.findIndex(r => r.studentId === studentId && r.eventId === eventId); if (index < 0) throw new Error('Event registration not found'); return this.#registrations.splice(index, 1)[0]; }
  getRegistrations(studentId) { return this.#registrations.filter(r => !studentId || r.studentId === studentId); }
  recordAttendance(studentId, eventId, status) { if (!['Present', 'Absent'].includes(status)) throw new Error('Attendance must be Present or Absent'); if (!this.findEvent(eventId)) throw new Error('Event not found'); const record = { studentId, eventId, status, recordedAt: new Date() }; const i = this.#attendance.findIndex(a => a.studentId === studentId && a.eventId === eventId); if (i >= 0) this.#attendance[i] = record; else this.#attendance.push(record); return record; }
  getAttendance(studentId) { return this.#attendance.filter(a => !studentId || a.studentId === studentId); }
  publishAnnouncement({ announcementId, clubId, title, message, authorId }) { if (!this.findClub(clubId)) throw new Error('Club not found'); if (this.#announcements.some(a => a.announcementId === announcementId)) throw new Error('Duplicate announcement ID'); const announcement = { announcementId, clubId, title, message, authorId, createdAt: new Date() }; this.#announcements.push(announcement); return announcement; }
  getAnnouncements(clubId) { return this.#announcements.filter(a => !clubId || a.clubId === clubId); }
}
module.exports = ClubEventsManager;
