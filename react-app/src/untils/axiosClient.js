import axios from "axios";
import queryString from "query-string";

const REACT_APP_BASE_BE = "http://localhost:9000/";

const axiosClient = axios.create({
  baseURL: REACT_APP_BASE_BE,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (param) => queryString.stringify(param),
});

export default axiosClient;
