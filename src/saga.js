import { DO_LOGIN_ATTEMPT } from "./actions/types";
import { delay } from "redux-saga";
import { call, all, takeLatest, put } from "redux-saga/effects";
import { loginStatus, setLoading } from "./actions/creators";

function* loginAttempt(action) {
  yield put(setLoading(true));
  yield call(delay, 3000);
  yield put(loginStatus(true));
}

function* watchEvent() {
  yield takeLatest(DO_LOGIN_ATTEMPT, loginAttempt);
}

export default function* rootSaga() {
  yield all([watchEvent()]);
}
