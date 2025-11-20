import axios from "axios";

const instance = axios.create({
  baseURL: "https://68e7e19a10e3f82fbf412882.mockapi.io",
});

export default instance;
