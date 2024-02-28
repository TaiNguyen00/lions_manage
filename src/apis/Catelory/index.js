import APIBase from "../baseApi";

export default class CateloryAPI extends APIBase {
    constructor() {
        super();
        this.endPoints = {
            getAll: "api/v1/cateloryRoom/getAll",
            get: "api/v1/cateloryRoom/getID",
            insert: "api/v1/cateloryRoom/add-cateloryRoom",
            update: "api/v1/cateloryRoom/edit-cateloryRoom",
            delete: "api/v1/cateloryRoom/delete-cateloryRoom",
        };
    }
}
