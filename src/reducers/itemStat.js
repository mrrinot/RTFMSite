import {
  FETCHED_ITEM_STAT,
  ITEM_STAT_LOADING,
  FETCHED_ADDITIONAL_ITEM_STAT,
} from "../actions/types";
import _ from "lodash";

const defaultState = {
  item: {},
  prices: [],
  errors: {},
  loading: true,
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
    case FETCHED_ADDITIONAL_ITEM_STAT:
      let prices = _.clone(state.prices);
      prices = _.concat(action.prices, prices);
      return {
        ...state,
        prices: prices,
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
