import { PAGE_LOADING } from "../actions/types";

const defaultState = {
  isLoading: false,
};

/**
 * Reducer updating state related to login stuff.
 
 * @export
 * @param {object} [state=defaultState] Current state
 * @param {object} [action={}] Action data
 * @returns {object} New state
 */
export default function loading(state = defaultState, action = {}) {
  switch (action.type) {
    case PAGE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}
