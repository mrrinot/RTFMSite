import axios from "axios";

export const getRecipes = where => {
  return axios.post("/api/recipes/", { where });
};
