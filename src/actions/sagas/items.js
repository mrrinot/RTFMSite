import { DO_FETCH_ITEMS } from "../types";
import { delay } from "redux-saga";
import { call, all, takeLatest, put } from "redux-saga/effects";
import { getItems } from "../../api/items";
import { onFetchedItems } from "../creators/items";

function* fetchItemsAttempt({ input }) {
  try {
    const ret = yield call(getItems, input);
    yield put(onFetchedItems(ret.data));
  } catch (e) {
    yield put(onFetchedItems([]));
  }
}

export function* watchItemsFetch() {
  yield takeLatest(DO_FETCH_ITEMS, fetchItemsAttempt);
}
