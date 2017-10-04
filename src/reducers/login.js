import { RETRIEVED_LOGIN_STATUS, LOGIN_LOADING, LOGIN_ERROR } from "../actions/types";

const defaultState = {
  isLoggedIn: false,
  loading: false,
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
        isLoggedIn: action.isLoggedIn,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        error: action.error.message,
      };

    default:
      return state;
  }
}