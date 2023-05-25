import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_REST_URL || "vaylariski/rest",
});
