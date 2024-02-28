import APIBase from "../baseApi";

export default class ProductAPI extends APIBase {
    constructor() {
        super();
        this.endPoints = {
            get: "api/v1/yourProduct/getID",
        };
    }
}