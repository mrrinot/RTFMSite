import axios from "axios";

export const createAPIKey = () => {
  return axios.post("/createAPIKey");
};
