import {
  DO_FETCH_ITEMS,
  DO_FETCH_ITEM_STAT,
  DO_FETCH_ITEMS_TYPES,
  DO_FETCH_ITEM_DATA_EFFECTS,
} from "../types";
import { loading } from "../creators/loading";
import { call, takeLatest, put } from "redux-saga/effects";
import { getItems, getItemStat, getItemsTypes, getItemDataEffects } from "../../api/items";
import {
  onFetchedItems,
  onFetchedItemStat,
  onFetchedItemsTypes,
  onFetchedItemDataEffects,
} from "../creators/items";

function* fetchItemsAttempt({ input }) {
  yield put(loading(true));
  try {
    const ret = yield call(getItems, input);
    yield put(onFetchedItems(ret.data));
  } catch (e) {
    yield put(onFetchedItems([], e.response.data.errors));
  }
  yield put(loading(false));
}

export function* watchItemsFetch() {
  yield takeLatest(DO_FETCH_ITEMS, fetchItemsAttempt);
}

function* fetchItemStatAttempt({ itemId, callback }) {
  yield put(loading(true));
  try {
    const ret = yield call(getItemStat, itemId);
    yield put(onFetchedItemStat(ret.data));
    yield call(callback);
  } catch (e) {
    yield put(onFetchedItemStat([], e.response.data.errors));
  }
  yield put(loading(false));
}

export function* watchItemStatFetch() {
  yield takeLatest(DO_FETCH_ITEM_STAT, fetchItemStatAttempt);
}

function* fetchItemsTypesAttempt() {
  yield put(loading(true));
  try {
    const ret = yield call(getItemsTypes);
    yield put(onFetchedItemsTypes(ret.data.itemsTypes));
  } catch (e) {
    yield put(onFetchedItemsTypes(null, e.response.data.errors));
  }
  yield put(loading(false));
}

export function* watchItemsTypesFetch() {
  yield takeLatest(DO_FETCH_ITEMS_TYPES, fetchItemsTypesAttempt);
}

function* fetchItemDataEffects({ itemData, itemDescIds }) {
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
