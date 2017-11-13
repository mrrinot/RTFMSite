import { FETCHED_ITEM_DATA_EFFECTS, ITEM_EFFECTS_LOADING } from "../actions/types";
import _ from "lodash";

const defaultState = {
  effects: {},
  errors: {},
  loading: false,
};

export default function itemDescEffects(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEM_DATA_EFFECTS:
      const effects = _.clone(state.effects);
      effects[action.itemData.id] = action.itemDataEffects;
      return {
        ...state,
        effects,
        errors: action.errors,
        loading: false,
      };
    case ITEM_EFFECTS_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
