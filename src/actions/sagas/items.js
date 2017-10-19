import { DO_FETCH_ITEMS } from "../types";
import { delay } from "redux-saga";
import { loading } from "../creators/loading";
import { call, all, takeLatest, put } from "redux-saga/effects";
import { getItems } from "../../api/items";
import { onFetchedItems } from "../creators/items";

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
