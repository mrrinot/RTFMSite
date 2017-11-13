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
