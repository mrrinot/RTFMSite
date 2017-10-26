import axios from "axios";

export const getItems = where => {
  return axios.post("/api/items/", { where });
};

export const getItemStat = itemId => {
  return axios.get(`/api/itemStat/${itemId}`);
};
