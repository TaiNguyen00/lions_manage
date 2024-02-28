import axios from "axios";
import { ROOT_URL_API } from "~/utils/constants";
const axiosClient = axios.create({
  baseURL: ROOT_URL_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true
});

//
// axiosClient.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     let res = error.response;
//     if (res.status === 401) {
//       window.location.href = "";
//     }
//     console.error(`Looks like there was a problem. Status Code: ` + res.status);
//     return Promise.reject(error);
//   }
// );
export default axiosClient;
