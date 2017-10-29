import { FETCHED_ITEMS_TYPES } from "../actions/types";

const defaultState = {
  itemsTypes: [],
  errors: {},
};

export default function metaData(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEMS_TYPES:
      return {
        ...state,
        itemsTypes: action.itemsTypes,
        errors: action.errors,
      };
    default:
      return state;
  }
}
