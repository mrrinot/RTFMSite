import {
  DO_LOGIN_ATTEMPT,
  RETRIEVED_LOGIN_STATUS,
  DO_LOGOUT,
  DO_RESET_PASSWORD_REQUEST,
  DO_RESET_PASSWORD_ATTEMPT,
  RETRIEVED_RESET_PASSWORD_STATUS,
} from "../types";

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

export function logoutAttempt() {
  return {
    type: DO_LOGOUT,
  };
}

export function resetPasswordRequestAttempt(email) {
  return {
    type: DO_RESET_PASSWORD_REQUEST,
    email,
  };
}

export function resetPasswordAttempt(data) {
  return {
    type: DO_RESET_PASSWORD_ATTEMPT,
    data,
  };
}

export function resetPasswordStatus(errors = {}) {
  return {
    type: RETRIEVED_RESET_PASSWORD_STATUS,
    errors,
  };
}
