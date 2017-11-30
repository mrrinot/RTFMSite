import { FETCHED_RECIPES, RECIPES_LOADING } from "../actions/types";

const defaultState = {
  loading: false,
  recipes: [],
  errors: {},
};

export default function recipes(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_RECIPES:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        recipes: action.recipes,
      };
    case RECIPES_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
