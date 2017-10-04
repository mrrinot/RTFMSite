import { FETCHED_ITEMS } from "../actions/types";

const defaultState = {
  items: [],
};

export default function items(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEMS:
      return {
        ...state,
        items: action.items,
      };
    default:
      return state;
  }
}
