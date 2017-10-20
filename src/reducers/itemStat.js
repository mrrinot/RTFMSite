import { FETCHED_ITEM_STAT } from "../actions/types";

const defaultState = {
  item: {},
  prices: [],
  errors: {},
};

export default function items(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEM_STAT:
      return {
        ...state,
        item: action.itemStat.item,
        prices: action.itemStat.prices,
        errors: action.errors,
      };
    default:
      return state;
  }
}
