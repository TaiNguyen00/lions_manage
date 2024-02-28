import APIBase from "../baseApi";

export default class UserAPI extends APIBase {
  constructor() {
    super();
    this.endPoints = {
      loginOwner: "api/v1/auth/login-owner",
      loginReception: "api/v1/auth/login-reception",
      getAll: "api/v1/user", //get all
      get: "api/v1/user/get-byID",
    };
  }
  loginOwner = (data) => this.httpPost(this.endPoints.loginOwner, data);
  loginReception = (data) => this.httpPost(this.endPoints.loginReception, data);
}
