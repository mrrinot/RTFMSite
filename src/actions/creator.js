import { DO_LOGIN_ATTEMPT } from "./types";

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
