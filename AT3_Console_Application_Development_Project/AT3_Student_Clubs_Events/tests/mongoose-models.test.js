const UserModel = require("../models/UserModel");
const {
  ClubModel,
  EventModel,
  MembershipModel,
  AttendanceModel,
  AnnouncementModel,
  ServiceRequestModel,
} = require("../models/DomainModels");

test("Mongoose models expose required collections and validation schemas", () => {
  expect(UserModel.modelName).toBe("User");
  expect(
    [
      ClubModel,
      EventModel,
      MembershipModel,
      AttendanceModel,
      AnnouncementModel,
      ServiceRequestModel,
    ].map((model) => model.modelName),
  ).toEqual([
    "Club",
    "Event",
    "Membership",
    "Attendance",
    "Announcement",
    "ServiceRequest",
  ]);
  expect(ClubModel.schema.path("category").enumValues).toContain("Technology");
  expect(EventModel.schema.path("capacity").options.min).toBe(1);
  expect(ServiceRequestModel.schema.path("status").enumValues).toEqual([
    "Submitted",
    "Cancelled",
  ]);
});
