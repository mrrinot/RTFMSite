import {
  DO_LOGIN_ATTEMPT,
  DO_LOGOUT,
  DO_RESET_PASSWORD_REQUEST,
  DO_RESET_PASSWORD_ATTEMPT,
} from "../types";
import history from "../../history";
import { call, takeLatest, put } from "redux-saga/effects";
import { loginStatus } from "../creators/login";
import { loading } from "../creators/loading";
import { onCreatedAPIKey } from "../creators/APIKey";
import { login, resetPasswordRequest, resetPassword } from "../../api/login";

function* loginAttempt(action) {
  yield put(loading(true));
  try {
    const ret = yield call(login, action.credentials);
    localStorage.rtfmUserInfos = JSON.stringify(ret.data);
    yield put(loginStatus(ret.data));
    yield put(onCreatedAPIKey(ret.data.APIKey));
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

function* resetPasswordRequestAttempt(action) {
  yield put(loading(true));
  const ret = yield call(resetPasswordRequest, action.email);
  yield put(loading(false));
}

export function* watchResetPasswordRequestAttempt() {
  yield takeLatest(DO_RESET_PASSWORD_REQUEST, resetPasswordRequestAttempt);
}

function* resetPasswordAttempt(action) {
  yield put(loading(true));
  const ret = yield call(resetPassword, action.data);
  history.push("/login");
  yield put(loading(false));
}

export function* watchResetPasswordAttempt() {
  yield takeLatest(DO_RESET_PASSWORD_ATTEMPT, resetPasswordAttempt);
}
