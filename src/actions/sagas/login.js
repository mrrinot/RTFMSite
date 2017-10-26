import { DO_LOGIN_ATTEMPT, DO_LOGOUT } from "../types";
import history from "../../history";
import { call, takeLatest, put } from "redux-saga/effects";
import { loginStatus } from "../creators/login";
import { loading } from "../creators/loading";
import { login } from "../../api/login";

function* loginAttempt(action) {
  yield put(loading(true));
  try {
    const ret = yield call(login, action.credentials);
    localStorage.rtfmUserInfos = JSON.stringify(ret.data);
    yield put(loginStatus(ret.data));
    history.push("/");
  } catch (e) {
    yield put(loginStatus({}, e.response.data.errors));
  }
  yield put(loading(false));
}

export function* watchLoginAttempt() {
  yield takeLatest(DO_LOGIN_ATTEMPT, loginAttempt);
}

function* logoutAttempt() {
  yield put(loginStatus({}));
  localStorage.removeItem("rtfmUserInfos");
}

export function* watchLogoutAttempt() {
  yield takeLatest(DO_LOGOUT, logoutAttempt);
}
