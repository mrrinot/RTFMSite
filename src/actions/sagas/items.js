import {
  DO_FETCH_ITEMS,
  DO_FETCH_ITEM_STAT,
  DO_FETCH_ITEMS_TYPES,
  DO_FETCH_ITEM_DATA_EFFECTS,
  DO_FETCH_ADDITIONAL_ITEM_STAT,
} from "../types";
import { call, takeLatest, put } from "redux-saga/effects";
import {
  getItems,
  getItemStat,
  getItemsTypes,
  getItemDataEffects,
  getAdditionalItemStat,
} from "../../api/items";
import {
  onFetchedItems,
  onFetchedItemStat,
  onFetchedAdditionalItemStat,
  onFetchedItemsTypes,
  onFetchedItemDataEffects,
  loadingItemEffects,
  loadingItemStat,
  loadingItems,
  loadingItemtypes,
} from "../creators/items";

function* fetchItemsAttempt({ input }) {
  yield put(loadingItems(true));
  try {
    const ret = yield call(getItems, input);
    yield put(onFetchedItems(ret.data));
  } catch (e) {
    yield put(onFetchedItems([], e.response.data.errors));
  }
}

export function* watchItemsFetch() {
  yield takeLatest(DO_FETCH_ITEMS, fetchItemsAttempt);
}

function* fetchItemStatAttempt({ itemId, callback }) {
  try {
    const ret = yield call(getItemStat, itemId);
    yield put(onFetchedItemStat(ret.data));
    yield call(callback);
  } catch (e) {
    yield put(onFetchedItemStat([], e.response.data.errors));
  }
}

export function* watchItemStatFetch() {
  yield takeLatest(DO_FETCH_ITEM_STAT, fetchItemStatAttempt);
}

function* fetchItemsTypesAttempt() {
  yield put(loadingItemtypes(true));
  try {
    const ret = yield call(getItemsTypes);
    yield put(onFetchedItemsTypes(ret.data.itemsTypes));
  } catch (e) {
    yield put(onFetchedItemsTypes(null, e.response.data.errors));
  }
}

export function* watchItemsTypesFetch() {
  yield takeLatest(DO_FETCH_ITEMS_TYPES, fetchItemsTypesAttempt);
}

function* fetchItemDataEffects({ itemData, itemDescIds }) {
  yield put(loadingItemEffects(true));
  try {
    const ret = yield call(getItemDataEffects, { timestamp: itemData.timestamp, ids: itemDescIds });
    yield put(onFetchedItemDataEffects(ret.data, itemData));
  } catch (e) {
    yield put(onFetchedItemDataEffects(null, itemData, e.response.data.errors));
  }
}

export function* watchItemDataEffectsFetch() {
  yield takeLatest(DO_FETCH_ITEM_DATA_EFFECTS, fetchItemDataEffects);
}

function* fetchAdditionalItemStatAttempt({ range, first, last, itemId, callback }) {
  yield put(loadingItemStat(true));
  try {
    const ret = yield call(getAdditionalItemStat, { range, first, last, itemId });
    yield put(onFetchedAdditionalItemStat(ret.data));
    yield call(callback);
  } catch (e) {
    yield put(onFetchedAdditionalItemStat([], e.response.data.errors));
  }
}

export function* watchAdditionalItemStatAttempt() {
  yield takeLatest(DO_FETCH_ADDITIONAL_ITEM_STAT, fetchAdditionalItemStatAttempt);
}
