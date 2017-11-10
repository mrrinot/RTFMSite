import { FETCHED_ITEMS } from "../actions/types";

const defaultState = {
  items: [],
  errors: {},
};

export default function items(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEMS:
      return {
        ...state,
        items: action.items,
        errors: action.errors,
      };
    default:
      return state;
  }
}
