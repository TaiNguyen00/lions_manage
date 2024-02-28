import APIBase from "../baseApi";

export default class StaffAPI extends APIBase {
    constructor() {
        super();
        this.endPoints = {
            get: "api/v1/staff/getAll",
            insert: "api/v1/staff/add-staff",
            update: "api/v1/staff/edit-staff",
            delete: "api/v1/staff/delete-staff"
        };
    }
}