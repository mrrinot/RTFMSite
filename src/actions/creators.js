import {
  DO_LOGIN_ATTEMPT,
  RETRIEVED_LOGIN_STATUS,
  LOGIN_LOADING,
  DO_FETCH_ITEMS,
  FETCHED_ITEMS,
} from "./types";

// Login
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
