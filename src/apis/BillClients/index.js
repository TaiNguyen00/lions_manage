import APIBase from "../baseApi";

export default class BillAPI extends APIBase {
    constructor() {
        super();
        this.endPoints = {
            getAll: "api/v1/billClient/getAll",
            get: "api/v1/billClient/getByID",
            insert: "api/v1/billClient/bill-client-add",
        };
    }
}
