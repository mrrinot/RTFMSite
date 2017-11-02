import { RETRIEVED_LOGIN_STATUS, RETRIEVED_RESET_PASSWORD_STATUS } from "../actions/types";

const defaultState = {
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
        userInfos: action.userInfos,
        errors: action.errors,
      };
    case RETRIEVED_RESET_PASSWORD_STATUS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}
