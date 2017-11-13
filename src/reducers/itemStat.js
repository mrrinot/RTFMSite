import { FETCHED_ITEM_STAT, ITEM_STAT_LOADING } from "../actions/types";

const defaultState = {
  item: {},
  prices: [],
  errors: {},
  loading: false,
};

export default function itemStat(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEM_STAT:
      return {
        ...state,
        item: action.itemStat.item,
        prices: action.itemStat.prices,
        dates: action.itemStat.dates,
        errors: action.errors,
        loading: false,
      };
    case ITEM_STAT_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
