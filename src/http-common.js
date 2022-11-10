import axios from "axios";

const BaseRestURL =
  process.env.REACT_APP_BASE_REST_URL || "http://127.0.0.1:8000/" ;


export default axios.create({
  baseURL: BaseRestURL
});