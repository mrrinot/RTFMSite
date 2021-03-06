import {
  RETRIEVED_INVITE_STATUS,
  RETRIEVED_INVITE_CONFIRM_STATUS,
  INVITE_LOADING,
} from "../actions/types";

const defaultState = {
  inviteInfos: {},
  errors: {},
  loading: false,
};

/**
 * Reducer updating state related to INVITE stuff.
 
 * @export
 * @param {object} [state=defaultState] Current state
 * @param {object} [action={}] Action data
 * @returns {object} New state
 */
export default function invite(state = defaultState, action = {}) {
  switch (action.type) {
    case RETRIEVED_INVITE_STATUS:
      return {
        ...state,
        inviteInfos: action.inviteInfos,
        errors: action.errors,
        loading: false,
      };
    case RETRIEVED_INVITE_CONFIRM_STATUS:
      return {
        ...state,
        inviteConfirmationInfos: action.inviteConfirmationInfos,
        errors: action.errors,
        loading: false,
      };
    case INVITE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}
