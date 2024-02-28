import APIBase from "../baseApi";

export default class ClientAPI extends APIBase {
    constructor() {
        super();
        this.endPoints = {
            insert: "api/v1/client/add-Client",
            getAll: "api/v1/client/getAll",
            get: "api/v1/client/getID"
        };
    }
}
