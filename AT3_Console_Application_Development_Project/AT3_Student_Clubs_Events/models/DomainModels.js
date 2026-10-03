const mongoose = require("mongoose");
const { Schema } = mongoose;
const clubSchema = new Schema(
  {
    clubId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Academic",
        "Sports",
        "Culture",
        "Technology",
        "Religious",
        "Social",
      ],
      required: true,
    },
    presidentId: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true },
);
const eventSchema = new Schema(
  {
    eventId: { type: String, required: true, unique: true },
    clubId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["Scheduled", "Cancelled", "Completed"],
      default: "Scheduled",
    },
  },
  { timestamps: true },
);
const membershipSchema = new Schema({
  studentId: { type: String, required: true },
  clubId: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
});
membershipSchema.index({ studentId: 1, clubId: 1 }, { unique: true });
const attendanceSchema = new Schema({
  studentId: { type: String, required: true },
  eventId: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
  recordedAt: { type: Date, default: Date.now },
});
attendanceSchema.index({ studentId: 1, eventId: 1 }, { unique: true });
const announcementSchema = new Schema(
  {
    announcementId: { type: String, required: true, unique: true },
    clubId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    authorId: { type: String, required: true },
  },
  { timestamps: true },
);
const serviceRequestSchema = new Schema({
  requestId: { type: String, required: true, unique: true },
  requesterId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  campusLocation: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "ICT Support",
      "Facilities Maintenance",
      "Cleaning and Sanitation",
      "General Campus Service",
    ],
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Normal", "High", "Urgent"],
    default: "Normal",
  },
  status: {
    type: String,
    enum: ["Submitted", "Cancelled"],
    default: "Submitted",
  },
  dateSubmitted: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});
const model = (name, schema) =>
  mongoose.models[name] || mongoose.model(name, schema);
module.exports = {
  ClubModel: model("Club", clubSchema),
  EventModel: model("Event", eventSchema),
  MembershipModel: model("Membership", membershipSchema),
  AttendanceModel: model("Attendance", attendanceSchema),
  AnnouncementModel: model("Announcement", announcementSchema),
  ServiceRequestModel: model("ServiceRequest", serviceRequestSchema),
};
