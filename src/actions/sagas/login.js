import { DO_LOGIN_ATTEMPT, DO_LOGOUT } from "../types";
import { delay } from "redux-saga";
import history from "../../history";
import { call, all, takeLatest, put } from "redux-saga/effects";
import { loginStatus, setLoginLoading } from "../creators/login";
import { login } from "../../api/login";

function* loginAttempt(action) {
  yield put(setLoginLoading(true));
  try {
    const ret = yield call(login, action.credentials);
    localStorage.rtfmUserInfos = JSON.stringify(ret.data);
    yield put(loginStatus(ret.data));
    history.push("/");
  } catch (e) {
    yield put(loginStatus({}, e.response.data.errors));
  }
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
