import axios from "axios";

// const BaseRestURL =


// console.log(process.env.REACT_APP_BASE_REST_URL)
// console.log(BaseRestURL)

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_REST_URL || "api"
});