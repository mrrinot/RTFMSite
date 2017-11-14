import { RETRIEVED_CREATE_API_KEY_STATUS, API_KEY_LOADING } from "../actions/types";

const defaultState = {
  key: "",
  errors: {},
  loading: false,
};
export default function APIKey(state = defaultState, action = {}) {
  switch (action.type) {
    case RETRIEVED_CREATE_API_KEY_STATUS:
      return {
        ...state,
        key: action.key,
        errors: action.errors,
        loading: false,
      };
    case API_KEY_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
