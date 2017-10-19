import { RETRIEVED_INVITE_STATUS, RETRIEVED_INVITE_CONFIRM_STATUS } from "../actions/types";

const defaultState = {
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
        inviteInfos: action.inviteInfos,
        errors: action.errors,
      };
    case RETRIEVED_INVITE_CONFIRM_STATUS:
      return {
        ...state,
        inviteConfirmationInfos: action.inviteConfirmationInfos,
        errors: action.errors,
      };
    default:
      return state;
  }
}
