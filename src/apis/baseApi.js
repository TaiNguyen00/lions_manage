import axiosClient from "./apiClient";
export class APIBase {
  constructor() {
    this.endPoints = {};
    /*
    {
        getAll: "",
        insert: "",
        update: "",
        delete: "",
        get: "",
    }
     */
  }
  httpGet = async (endpoint) => {
    const response = await axiosClient.get(endpoint);
    return response.data;
  };
  httpPost = async (endPoints, data) => {
    const response = await axiosClient.post(endPoints, data);
    return response.data;
  };
  httpPut = async (endPoints, data) => {
    const response = await axiosClient.put(endPoints, data);
    return response.data
  }
  httpDelete = async (endPoints, id) => {
    const response = await axiosClient.delete(endPoints, { data: { ...id } });
    return response.data
  }
  getAll = () => this.httpGet(this.endPoints.getAll);
  insert = (data) => this.httpPost(this.endPoints.insert, data);
  delete = (id) => this.httpDelete(this.endPoints.delete, id);
  get = (id) => this.httpPost(this.endPoints.get, id);
  gets = (id) => this.httpPost(this.endPoints.gets, id);
  update = (data) => this.httpPut(this.endPoints.update, data);
}
export default APIBase;
