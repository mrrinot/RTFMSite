import {
  RETRIEVED_LOGIN_STATUS,
  RETRIEVED_RESET_PASSWORD_STATUS,
  LOGIN_LOADING,
} from "../actions/types";

const defaultState = {
  userInfos: {},
  errors: {},
  loading: false,
};

/**
 * Reducer updating state related to login stuff.
 
 * @export
 * @param {object} [state=defaultState] Current state
 * @param {object} [action={}] Action data
 * @returns {object} New state
 */
export default function auth(state = defaultState, action = {}) {
  switch (action.type) {
    case RETRIEVED_LOGIN_STATUS:
      return {
        ...state,
        userInfos: action.userInfos,
        errors: action.errors,
        loading: false,
      };
    case RETRIEVED_RESET_PASSWORD_STATUS:
      return { ...state, errors: action.errors, loading: false };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
