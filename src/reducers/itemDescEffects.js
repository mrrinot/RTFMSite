import { FETCHED_ITEM_DATA_EFFECTS } from "../actions/types";
import _ from "lodash";

const defaultState = {
  effects: {},
  errors: {},
};

export default function itemDescEffects(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCHED_ITEM_DATA_EFFECTS:
      const effects = _.clone(state.effects);
      effects[action.itemDataId] = action.itemDataEffects;
      return {
        ...state,
        effects,
        errors: action.errors,
      };
    default:
      return state;
  }
}
