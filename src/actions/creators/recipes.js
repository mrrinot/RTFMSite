import { RECIPES_LOADING, DO_FETCH_RECIPES, FETCHED_RECIPES } from "../types";

export function fetchRecipes(input) {
  return {
    type: DO_FETCH_RECIPES,
    input,
  };
}

export function onFetchedRecipes(recipes, errors = {}) {
  return {
    type: FETCHED_RECIPES,
    errors,
    recipes,
  };
}

export function loadingRecipes(loading) {
  return {
    type: RECIPES_LOADING,
    loading,
  };
}
