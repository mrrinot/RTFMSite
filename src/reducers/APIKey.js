import { RETRIEVED_CREATE_API_KEY_STATUS } from "../actions/types";

const defaultState = {
  key: "",
  errors: {},
};
export default function APIKey(state = defaultState, action = {}) {
  switch (action.type) {
    case RETRIEVED_CREATE_API_KEY_STATUS:
      return {
        ...state,
        key: action.key,
        errors: action.errors,
      };
    default:
      return state;
  }
}
