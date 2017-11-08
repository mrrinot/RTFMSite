import axios from "axios";

//Items
export const getItems = where => {
  return axios.post("/api/items/", { where });
};

export const getItemsTypes = () => {
  return axios.get("/api/items/types");
};

// ItemStats
export const getItemStat = itemId => {
  return axios.get(`/api/itemStat/${itemId}`);
};
export const getItemDataEffects = itemDescIds => {
  return axios.post("/api/itemStat/effects/", { itemDescIds });
};
