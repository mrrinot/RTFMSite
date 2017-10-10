import { DO_LOGIN_ATTEMPT, DO_FETCH_ITEMS } from "./actions/types";
import { delay } from "redux-saga";
import { call, all, takeLatest, put } from "redux-saga/effects";
import { loginStatus, setLoading, onFetchedItems } from "./actions/creators";
import { getItems } from "./api/items";
import { login } from "./api/login";

function* loginAttempt(action) {
  yield put(setLoading(true));
  try {
    const ret = yield call(login, action.credentials);
    console.log(ret);
    yield put(loginStatus(ret.data.token, {}));
  } catch (e) {
    yield put(loginStatus(null, e.response.data.errors));
  }
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
