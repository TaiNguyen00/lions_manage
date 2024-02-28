import APIBase from "../baseApi";

export default class AccountManegeAPI extends APIBase {
    constructor() {
        super();
        this.endPoints = {
            insert: "api/v1/account/addManege",
            get: "api/v1/account/getManege",
            getId: "api/v1/account/getManege",
            update: "api/v1/account/editManege",
            delete: "api/v1/account/deleteManege"
        };
    }
    getId = (id) => this.httpPost(this.getId.get, id);

}
