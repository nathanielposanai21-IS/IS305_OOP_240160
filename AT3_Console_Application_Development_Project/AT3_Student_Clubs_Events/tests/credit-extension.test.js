const User = require("../User");
const ServiceRequest = require("../ServiceRequest");
const ServiceRequestManager = require("../ServiceRequestManager");
const {
  StudentRequester,
  ServiceOfficer,
  Technician,
} = require("../models/RequesterRoles");
const {
  ICTSupportRequest,
  MaintenanceRequest,
  CleaningRequest,
} = require("../models/SpecializedRequests");

describe("AT3 Credit Extension", () => {
  let manager;
  let requester;
  let officer;
  let technician;
  let otherTechnician;
  beforeEach(() => {
    manager = new ServiceRequestManager();
    requester = new StudentRequester(
      {
        userId: "STU100",
        firstName: "Student",
        lastName: "Requester",
        email: "student@example.com",
      },
      { programme: "Computing", yearLevel: 2 },
    );
    officer = new ServiceOfficer(
      {
        userId: "OFF100",
        firstName: "Service",
        lastName: "Officer",
        email: "officer@example.com",
      },
      { serviceSection: "Campus Services" },
    );
    technician = new Technician(
      {
        userId: "TECH100",
        firstName: "Tech",
        lastName: "One",
        email: "tech@example.com",
      },
      { technicalSpeciality: "ICT" },
    );
    otherTechnician = new Technician(
      {
        userId: "TECH200",
        firstName: "Tech",
        lastName: "Two",
        email: "tech2@example.com",
      },
      { technicalSpeciality: "General" },
    );
    [requester, officer, technician, otherTechnician].forEach((user) =>
      manager.registerUser(user),
    );
  });

  test("subclasses use constructor chaining and validate specialised fields", () => {
    expect(requester).toBeInstanceOf(User);
    expect(requester.programme).toBe("Computing");
    expect(requester.yearLevel).toBe(2);
    expect(
      () =>
        new StudentRequester(
          { userId: "S", firstName: "A", lastName: "B", email: "a@b.com" },
          { programme: "", yearLevel: 1 },
        ),
    ).toThrow("Programme is required");
    expect(
      () =>
        new ICTSupportRequest(
          {
            requestId: "R1",
            requester,
            title: "Wi-Fi",
            description: "Down",
            campusLocation: "Lab",
            priority: "High",
          },
          {
            deviceType: "Laptop",
            systemName: "Wi-Fi",
            faultType: "Outage",
            networkImpact: "Invalid",
          },
        ),
    ).toThrow("Unsupported network impact");
    expect(
      new MaintenanceRequest(
        {
          requestId: "R2",
          requester,
          title: "Leak",
          description: "Water",
          campusLocation: "A",
          priority: "High",
        },
        {
          building: "A",
          roomNumber: "1",
          hazardLevel: "High",
          equipmentAffected: "Pipe",
        },
      ),
    ).toBeInstanceOf(ServiceRequest);
    expect(
      new CleaningRequest(
        {
          requestId: "R3",
          requester,
          title: "Spill",
          description: "Spill",
          campusLocation: "B",
          priority: "Normal",
        },
        {
          cleaningArea: "Kitchen",
          hygieneRisk: "High",
          serviceType: "Deep clean",
          preferredServiceTime: "9am",
        },
      ).getRequestSummary(),
    ).toContain("Area: Kitchen");
  });

  test("enforces the controlled workflow and role permissions", () => {
    const request = new ICTSupportRequest(
      {
        requestId: "CR1",
        requester,
        title: "Network outage",
        description: "Campus network unavailable",
        campusLocation: "Lab",
        priority: "Normal",
      },
      {
        deviceType: "Router",
        systemName: "Campus Wi-Fi",
        faultType: "Outage",
        networkImpact: "Campus-wide",
      },
    );
    manager.submitRequest(request);
    expect(() => manager.reviewRequest("CR1", requester)).toThrow(
      "Only a Service Officer",
    );
    manager.reviewRequest("CR1", officer);
    manager.assignTechnician("CR1", officer, "TECH100", "Urgent");
    expect(() => manager.startWork("CR1", otherTechnician)).toThrow(
      "assigned Technician",
    );
    manager.startWork("CR1", technician);
    manager.addProgressUpdate("CR1", technician, "Diagnosing the router");
    manager.resolveRequest("CR1", technician);
    manager.closeRequest("CR1", officer);
    expect(request.status).toBe("Closed");
    expect(
      request.history
        .filter((entry) => entry.previousStatus !== entry.newStatus)
        .map((entry) => entry.newStatus),
    ).toEqual(["Reviewed", "Assigned", "In Progress", "Resolved", "Closed"]);
    expect(request.progressUpdates[0].comment).toBe("Diagnosing the router");
    expect(() => manager.startWork("CR1", technician)).toThrow(
      "Invalid status transition",
    );
  });

  test("only the requester may update or cancel a Submitted request", () => {
    const request = new ServiceRequest({
      requestId: "CR2",
      requester,
      title: "Broken chair",
      description: "Chair is unsafe",
      campusLocation: "Room 3",
      category: "Facilities Maintenance",
      priority: "Low",
    });
    manager.submitRequest(request);
    expect(() =>
      manager.updateRequest("CR2", officer.userId, { title: "No" }),
    ).toThrow("only modify your own");
    manager.updateRequest("CR2", requester.userId, {
      title: "Broken desk chair",
    });
    expect(request.title).toBe("Broken desk chair");
    manager.cancelRequest("CR2", requester.userId);
    expect(request.status).toBe("Cancelled");
    expect(() => manager.reviewRequest("CR2", officer)).toThrow(
      "Invalid status transition",
    );
  });

  test("searches, filters, and sorts requests", () => {
    const first = new ICTSupportRequest(
      {
        requestId: "CR3",
        requester,
        title: "Printer",
        description: "Printer fault",
        campusLocation: "Library",
        priority: "Low",
        dateSubmitted: new Date("2026-01-01"),
      },
      {
        deviceType: "Printer",
        systemName: "Print",
        faultType: "Jam",
        networkImpact: "Local",
      },
    );
    const second = new MaintenanceRequest(
      {
        requestId: "CR4",
        requester,
        title: "Leak",
        description: "Water leak",
        campusLocation: "Block A",
        priority: "Urgent",
        dateSubmitted: new Date("2026-02-01"),
      },
      {
        building: "A",
        roomNumber: "2",
        hazardLevel: "High",
        equipmentAffected: "Pipe",
      },
    );
    manager.submitRequest(first);
    manager.submitRequest(second);
    expect(manager.searchRequests("printer")).toEqual([first]);
    expect(
      manager.filterRequests({ category: "Facilities Maintenance" }),
    ).toEqual([second]);
    expect(manager.filterRequests({ priority: "Urgent" })).toEqual([second]);
    expect(
      manager.sortRequests(manager.getAllRequests(), "priority", "desc")[0],
    ).toBe(second);
    expect(
      manager.queryRequests({
        status: "Submitted",
        sortBy: "dateSubmitted",
      })[0],
    ).toBe(first);
  });
});
