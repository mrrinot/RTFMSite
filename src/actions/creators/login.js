import { DO_LOGIN_ATTEMPT, RETRIEVED_LOGIN_STATUS, LOGIN_LOADING, DO_LOGOUT } from "../types";

export function loginAttempt(credentials) {
  return {
    type: DO_LOGIN_ATTEMPT,
    credentials,
  };
}

export function loginStatus(userInfos, errors = {}) {
  return {
    type: RETRIEVED_LOGIN_STATUS,
    userInfos,
    errors,
  };
}

export function setLoginLoading(isLoading) {
  return {
    type: LOGIN_LOADING,
    loading: isLoading,
  };
}

export function logoutAttempt() {
  return {
    type: DO_LOGOUT,
  };
}
