import {
  DO_FETCH_ITEMS,
  FETCHED_ITEMS,
  DO_FETCH_ITEM_STAT,
  FETCHED_ITEM_STAT,
  DO_FETCH_ITEMS_TYPES,
  FETCHED_ITEMS_TYPES,
  DO_FETCH_ITEM_DATA_EFFECTS,
  FETCHED_ITEM_DATA_EFFECTS,
  ITEM_STAT_LOADING,
  ITEM_EFFECTS_LOADING,
  ITEMS_LOADING,
  DO_FETCH_ADDITIONAL_ITEM_STAT,
  FETCHED_ADDITIONAL_ITEM_STAT,
  ITEM_TYPES_LOADING,
} from "../types";

export function fetchItems(input) {
  return {
    type: DO_FETCH_ITEMS,
    input,
  };
}

export function onFetchedItems(items, errors = {}) {
  return {
    type: FETCHED_ITEMS,
    items,
    errors,
  };
}

export function loadingItems(loading) {
  return {
    type: ITEMS_LOADING,
    loading,
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

export function fetchAdditionalItemStat(itemId, range, first, last, callback) {
  return {
    type: DO_FETCH_ADDITIONAL_ITEM_STAT,
    range,
    first,
    last,
    itemId,
    callback,
  };
}

export function onFetchedAdditionalItemStat(prices, errors = {}) {
  return {
    type: FETCHED_ADDITIONAL_ITEM_STAT,
    errors,
    prices,
  };
}

export function fetchItemsTypes() {
  return {
    type: DO_FETCH_ITEMS_TYPES,
  };
}

export function onFetchedItemsTypes(itemsTypes, errors = {}) {
  return {
    type: FETCHED_ITEMS_TYPES,
    errors,
    itemsTypes,
  };
}

export function fetchItemDataEffects(itemData, itemDescIds) {
  return {
    type: DO_FETCH_ITEM_DATA_EFFECTS,
    itemData,
    itemDescIds,
  };
}

export function onFetchedItemDataEffects(itemDataEffects, itemData, errors = {}) {
  return {
    type: FETCHED_ITEM_DATA_EFFECTS,
    itemDataEffects,
    itemData,
    errors,
  };
}

export function loadingItemStat(loading) {
  return {
    type: ITEM_STAT_LOADING,
    loading,
  };
}

export function loadingItemEffects(loading) {
  return {
    type: ITEM_EFFECTS_LOADING,
    loading,
  };
}

export function loadingItemtypes(loading) {
  return {
    type: ITEM_TYPES_LOADING,
    loading,
  };
}
