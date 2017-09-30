import { DO_LOGIN_ATTEMPT, RETRIEVED_LOGIN_STATUS, LOGIN_LOADING } from "./types";

/**
 * Returns an action of type DO_LOGIN_ATTEMPT
 *
 * @export
 * @param {object} credentials User credentials
 * @returns {object} DO_LOGIN_ATTEMPT action
 */
export function loginAttempt(credentials) {
  return {
    type: DO_LOGIN_ATTEMPT,
    credentials,
  };
}

export function loginStatus(isLoggedIn) {
  return {
    type: RETRIEVED_LOGIN_STATUS,
    isLoggedIn,
  };
}

export function setLoading(isLoading) {
  return {
    type: LOGIN_LOADING,
    loading: isLoading,
  };
}
