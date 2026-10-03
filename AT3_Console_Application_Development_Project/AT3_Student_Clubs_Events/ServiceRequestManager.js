class ServiceRequestManager {
  #users = [];
  #requests = [];

  registerUser(user) {
    if (this.#users.some((existing) => existing.userId === user.userId))
      throw new Error(`Duplicate user ID: ${user.userId}`);
    this.#users.push(user);
    return user;
  }

  findUserById(userId) {
    return this.#users.find((user) => user.userId === userId);
  }

  submitRequest(request) {
    if (
      this.#requests.some(
        (existing) => existing.requestId === request.requestId,
      )
    )
      throw new Error(`Duplicate request ID: ${request.requestId}`);
    if (!this.findUserById(request.requester.userId))
      throw new Error(
        "Requester must be registered before submitting a request",
      );
    this.#requests.push(request);
    return request;
  }

  findRequestById(requestId) {
    return this.#requests.find((request) => request.requestId === requestId);
  }
  getRequestsByUser(userId) {
    return this.#requests.filter(
      (request) => request.requester.userId === userId,
    );
  }
  getAllRequests() {
    return [...this.#requests];
  }

  updateRequest(requestId, userId, changes) {
    const request = this.#getOwnedRequest(requestId, userId);
    return request.updateDetails(changes);
  }

  cancelRequest(requestId, userId) {
    const request = this.#getOwnedRequest(requestId, userId);
    return request.cancelRequest();
  }

  searchRequests(searchText) {
    const query = String(searchText || "")
      .trim()
      .toLowerCase();
    if (!query) return [];
    return this.#requests.filter((request) =>
      [
        request.requestId,
        request.title,
        request.description,
        request.category,
        request.campusLocation,
        request.priority,
        request.status,
      ].some((value) => String(value).toLowerCase().includes(query)),
    );
  }

  getRequestSummaryByStatus() {
    return this.#requests.reduce(
      (summary, request) => {
        summary[request.status] = (summary[request.status] || 0) + 1;
        return summary;
      },
      { Submitted: 0, Cancelled: 0 },
    );
  }

  #getOwnedRequest(requestId, userId) {
    const request = this.findRequestById(requestId);
    if (!request) throw new Error(`Request not found: ${requestId}`);
    if (request.requester.userId !== userId)
      throw new Error("You may only modify your own request");
    return request;
  }
}

module.exports = ServiceRequestManager;
