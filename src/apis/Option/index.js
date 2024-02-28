import APIBase from "../baseApi";

export default class OptionAPI extends APIBase {
  constructor() {
    super();
    this.endPoints = {
      getAll: "option",
    };
  }
}
