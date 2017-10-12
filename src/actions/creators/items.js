import { DO_FETCH_ITEMS, FETCHED_ITEMS } from "../types";

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
