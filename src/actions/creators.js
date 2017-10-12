import {
  DO_LOGIN_ATTEMPT,
  RETRIEVED_LOGIN_STATUS,
  LOGIN_LOADING,
  DO_FETCH_ITEMS,
  FETCHED_ITEMS,
  DO_LOGOUT,
  DO_INVITE_SEND,
  RETRIEVED_INVITE_STATUS,
  INVITE_LOADING,
  DO_INVITE_CONFIRM,
  RETRIEVED_INVITE_CONFIRM_STATUS,
} from "./types";

// Login
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

// Items
export function fetchItems(input) {
  return {
    type: DO_FETCH_ITEMS,
    input,
  };
}

export function onFetchedItems(items) {
  return {
    type: FETCHED_ITEMS,
    items,
  };
}

// Invite
export function sendInviteAttempt(inviteInfos) {
  return {
    type: DO_INVITE_SEND,
    inviteInfos,
  };
}

export function inviteStatus(inviteInfos, errors = {}) {
  return {
    type: RETRIEVED_INVITE_STATUS,
    inviteInfos,
    errors,
  };
}

export function setInviteLoading(isLoading) {
  return {
    type: INVITE_LOADING,
    loading: isLoading,
  };
}

export function sendInviteConfirmationAttempt(inviteConfirmationInfos) {
  return {
    type: DO_INVITE_CONFIRM,
    inviteConfirmationInfos,
  };
}

export function inviteConfirmStatus(inviteConfirmationStatus, errors = {}) {
  return {
    type: RETRIEVED_INVITE_CONFIRM_STATUS,
    inviteConfirmationStatus,
    errors,
  };
}
