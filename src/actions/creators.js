import {
  DO_LOGIN_ATTEMPT,
  RETRIEVED_LOGIN_STATUS,
  LOGIN_LOADING,
  DO_FETCH_ITEMS,
  FETCHED_ITEMS,
  DO_LOGOUT,
} from "./types";

// Login
export function loginAttempt(credentials) {
  return {
    type: DO_LOGIN_ATTEMPT,
    credentials,
  };
}

export function loginStatus(JWT, errors = {}) {
  return {
    type: RETRIEVED_LOGIN_STATUS,
    JWT,
    errors,
  };
}

export function setLoading(isLoading) {
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
