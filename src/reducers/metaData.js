import { FETCHED_ITEMS_TYPES, ITEM_TYPES_LOADING } from "../actions/types";

const defaultState = {
  itemsTypes: [],
  errors: {},
  loading: false,
};

export default function metaData(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEMS_TYPES:
      return {
        ...state,
        itemsTypes: action.itemsTypes,
        errors: action.errors,
        loading: false,
      };
    case ITEM_TYPES_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
