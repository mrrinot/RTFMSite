import { DO_CREATE_API_KEY_ATTEMPT, RETRIEVED_CREATE_API_KEY_STATUS } from "../types";

export function createAPIKeyAttempt() {
  return {
    type: DO_CREATE_API_KEY_ATTEMPT,
  };
}

export function onCreatedAPIKey(key, errors = {}) {
  return {
    type: RETRIEVED_CREATE_API_KEY_STATUS,
    key,
    errors,
  };
}
