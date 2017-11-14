import { FETCHED_ITEMS, ITEMS_LOADING } from "../actions/types";

const defaultState = {
  items: [],
  errors: {},
  loading: false,
};

export default function items(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEMS:
      return {
        ...state,
        items: action.items,
        errors: action.errors,
        loading: false,
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
