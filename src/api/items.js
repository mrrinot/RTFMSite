import axios from "axios";

export const getItems = input => {
  return axios.get(`/api/items/${input}`);
};

export const getItemStat = itemId => {
  return axios.get(`/api/itemStat/${itemId}`);
};
