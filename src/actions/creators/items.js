import { DO_FETCH_ITEMS, FETCHED_ITEMS, DO_FETCH_ITEM_STAT, FETCHED_ITEM_STAT } from "../types";

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

export function fetchItemStat(itemId, callback) {
  return {
    type: DO_FETCH_ITEM_STAT,
    itemId,
    callback,
  };
}

export function onFetchedItemStat(itemStat, errors = {}) {
  return {
    type: FETCHED_ITEM_STAT,
    errors,
    itemStat,
  };
}
