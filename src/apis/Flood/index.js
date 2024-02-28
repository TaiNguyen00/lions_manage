import APIBase from "../baseApi";

export default class FloorAPI extends APIBase {
  constructor() {
    super();
    this.endPoints = {
      getAll: "/api/v1/floor/getAll",
      insert: '/api/v1/floor/add-floor',
      update: '/api/v1/floor/edit-floor',
      delete: "api/v1/floor/delete-floor",
      get: "api/v1/floor/getID",
    };
  }
}
