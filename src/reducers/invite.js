import {
  RETRIEVED_INVITE_STATUS,
  INVITE_LOADING,
  INVITE_ERROR,
  RETRIEVED_INVITE_CONFIRM_STATUS,
} from "../actions/types";

const defaultState = {
  loading: false,
  inviteInfos: {},
  errors: {},
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
        loading: false,
        inviteInfos: action.inviteInfos,
        errors: action.errors,
      };
    case INVITE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RETRIEVED_INVITE_CONFIRM_STATUS:
      return {
        ...state,
        loading: false,
        inviteConfirmationInfos: action.inviteConfirmationInfos,
        errors: action.errors,
      };
    default:
      return state;
  }
}
