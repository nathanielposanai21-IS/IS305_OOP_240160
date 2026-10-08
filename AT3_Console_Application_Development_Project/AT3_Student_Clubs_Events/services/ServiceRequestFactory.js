const User = require('../User');
const ServiceRequest = require('../ServiceRequest');
const { ICTSupportRequest, MaintenanceRequest, CleaningRequest } = require('./../models/SpecializedRequests');

class ServiceRequestFactory {
  static createFromData(data, users = new Map()) {
    const requester = users.get(data.requesterId) || new User({ userId: data.requesterId, firstName: data.requesterFirstName || 'Restored', lastName: data.requesterLastName || 'User', email: data.requesterEmail || `${data.requesterId.toLowerCase()}@restored.local` });
    const common = { requestId: data.requestId, requester, title: data.title, description: data.description, campusLocation: data.campusLocation || data.location, priority: data.priority, dateSubmitted: data.dateSubmitted };
    const request = data.requestType === 'ICTSupportRequest' ? new ICTSupportRequest(common, { deviceType: data.deviceType, systemName: data.systemName, faultType: data.faultType, networkImpact: data.networkImpact }) : data.requestType === 'MaintenanceRequest' ? new MaintenanceRequest(common, { building: data.building, roomNumber: data.roomNumber, hazardLevel: data.hazardLevel, equipmentAffected: data.equipmentAffected }) : data.requestType === 'CleaningRequest' ? new CleaningRequest(common, { cleaningArea: data.cleaningArea, hygieneRisk: data.hygieneRisk, serviceType: data.serviceType, preferredServiceTime: data.preferredServiceTime }) : new ServiceRequest(common);
    return ServiceRequestFactory.#restoreState(request, data, users);
  }

  static #restoreState(request, data, users) {
    const actor = { userId: 'RESTORE', userType: 'System' };
    const statusOrder = ['Reviewed', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
    const targetIndex = statusOrder.indexOf(data.status);
    if (targetIndex >= 0) {
      request.transitionTo('Reviewed', actor, 'Restored from JSON');
      if (targetIndex >= 1) {
        const technician = users.get(data.assignedTechnicianId) || { userId: data.assignedTechnicianId || 'RESTORED-TECH', userType: 'Technician', getFullName: () => 'Restored Technician' };
        request.assignTechnician(technician, 'Restored technician assignment');
        if (targetIndex >= 2) request.transitionTo('In Progress', technician, 'Restored from JSON');
        if (targetIndex >= 3) request.transitionTo('Resolved', technician, 'Restored from JSON');
        if (targetIndex >= 4) request.transitionTo('Closed', actor, 'Restored from JSON');
      }
    } else if (data.status === 'Cancelled') request.cancelRequest(actor, 'Restored cancellation');
    return request;
  }
}
module.exports = ServiceRequestFactory;
