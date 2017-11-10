import {
  DO_FETCH_ITEMS,
  FETCHED_ITEMS,
  DO_FETCH_ITEM_STAT,
  FETCHED_ITEM_STAT,
  DO_FETCH_ITEMS_TYPES,
  FETCHED_ITEMS_TYPES,
  DO_FETCH_ITEM_DATA_EFFECTS,
  FETCHED_ITEM_DATA_EFFECTS,
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

export function fetchItemDataEffects(itemDataId, itemDescIds) {
  return {
    type: DO_FETCH_ITEM_DATA_EFFECTS,
    itemDataId,
    itemDescIds,
  };
}

export function onFetchedItemDataEffects(itemDataEffects, itemDataId, errors = {}) {
  return {
    type: FETCHED_ITEM_DATA_EFFECTS,
    itemDataEffects,
    itemDataId,
    errors,
  };
}
