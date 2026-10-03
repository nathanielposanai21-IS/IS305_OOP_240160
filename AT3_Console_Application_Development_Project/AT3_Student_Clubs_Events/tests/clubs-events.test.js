const Club = require("../models/Club");
const Event = require("../models/Event");
const ClubEventsManager = require("../managers/ClubEventsManager");

describe("Student Clubs and Events subsystem", () => {
  let manager;
  let club;
  let event;
  beforeEach(() => {
    manager = new ClubEventsManager();
    club = new Club({
      clubId: "CLB001",
      name: "Computing Society",
      description: "Technology community",
      category: "Technology",
      presidentId: "STU001",
    });
    manager.registerClub(club);
    event = new Event({
      eventId: "EVT001",
      clubId: "CLB001",
      name: "Coding Workshop",
      description: "Introductory workshop",
      date: "15/10/2026",
      time: "14:00",
      location: "Computer Lab",
      capacity: 1,
    });
  });
  test("registers clubs and prevents duplicate memberships", () => {
    manager.joinClub("STU001", "CLB001");
    expect(manager.getMemberships("STU001")).toHaveLength(1);
    expect(() => manager.joinClub("STU001", "CLB001")).toThrow(
      "already a member",
    );
  });
  test("creates events and prevents over-capacity registration", () => {
    manager.createEvent(event);
    manager.registerForEvent("STU001", "EVT001");
    expect(() => manager.registerForEvent("STU002", "EVT001")).toThrow(
      "capacity",
    );
  });
  test("rejects registration for cancelled events", () => {
    manager.createEvent(event);
    event.cancel();
    expect(() => manager.registerForEvent("STU001", "EVT001")).toThrow(
      "only available",
    );
  });
  test("records and updates attendance", () => {
    manager.createEvent(event);
    manager.recordAttendance("STU001", "EVT001", "Present");
    manager.recordAttendance("STU001", "EVT001", "Absent");
    expect(manager.getAttendance("STU001")[0].status).toBe("Absent");
  });
});
