import { RETRIEVED_LOGIN_STATUS, LOGIN_LOADING, LOGIN_ERROR } from "../actions/types";

const defaultState = {
  loading: false,
  userInfos: {},
  errors: {},
};

/**
 * Reducer updating state related to login stuff.
 
 * @export
 * @param {object} [state=defaultState] Current state
 * @param {object} [action={}] Action data
 * @returns {object} New state
 */
export default function login(state = defaultState, action = {}) {
  switch (action.type) {
    case RETRIEVED_LOGIN_STATUS:
      return {
        ...state,
        loading: false,
        userInfos: action.userInfos,
        errors: action.errors,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
