import axios from "axios";

export const getItems = input => {
  return axios.get(`/items/${input}`);
};
