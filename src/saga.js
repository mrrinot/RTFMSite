import { DO_LOGIN_ATTEMPT, DO_FETCH_ITEMS } from "./actions/types";
import { delay } from "redux-saga";
import { call, all, takeLatest, put } from "redux-saga/effects";
import { loginStatus, setLoading, onFetchedItems } from "./actions/creators";
import { getItems } from "./api/items";

function* loginAttempt(action) {
  yield put(setLoading(true));
  yield call(delay, 3000);
  yield put(loginStatus(true));
}

function* watchLoginAttempt() {
  yield takeLatest(DO_LOGIN_ATTEMPT, loginAttempt);
}

function* fetchItemsAttempt({ input }) {
  try {
    const ret = yield call(getItems, input);
    yield put(onFetchedItems(ret.data));
  } catch (e) {
    yield put(onFetchedItems([]));
  }
}

function* watchItemsFetch() {
  yield takeLatest(DO_FETCH_ITEMS, fetchItemsAttempt);
}

export default function* rootSaga() {
  yield all([watchLoginAttempt(), watchItemsFetch()]);
}
