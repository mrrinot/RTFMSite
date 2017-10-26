import { DO_FETCH_ITEMS, DO_FETCH_ITEM_STAT } from "../types";
import { loading } from "../creators/loading";
import { call, takeLatest, put } from "redux-saga/effects";
import { getItems, getItemStat } from "../../api/items";
import { onFetchedItems, onFetchedItemStat } from "../creators/items";

function* fetchItemsAttempt({ input }) {
  yield put(loading(true));
  try {
    const ret = yield call(getItems, input);
    yield put(onFetchedItems(ret.data));
  } catch (e) {
    yield put(onFetchedItems([]));
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
    yield put(onFetchedItemStat([]));
  }
  yield put(loading(false));
}

export function* watchItemStatFetch() {
  yield takeLatest(DO_FETCH_ITEM_STAT, fetchItemStatAttempt);
}
