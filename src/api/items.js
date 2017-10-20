import axios from "axios";

export const getItems = input => {
  return axios.get(`/items/${input}`);
};

export const getItemStat = itemId => {
  return axios.get(`/itemStat/${itemId}`);
};
