import { DO_LOGIN_ATTEMPT, DO_LOGOUT } from "../types";
import { delay } from "redux-saga";
import { call, all, takeLatest, put } from "redux-saga/effects";
import { loginStatus, setLoginLoading } from "../creators/login";
import { login } from "../../api/login";
import decode from "jwt-decode";

function* loginAttempt(action) {
  yield put(setLoginLoading(true));
  try {
    const ret = yield call(login, action.credentials);
    localStorage.rtfmJWT = ret.data.token;
    const payload = yield call(decode, localStorage.rtfmJWT);
    const userInfos = {
      token: localStorage.rtfmJWT,
      email: payload.email,
      adminLevel: payload.adminLevel,
      pseudo: payload.pseudo,
    };
    yield put(loginStatus(userInfos));
  } catch (e) {
    yield put(loginStatus({}, e.response.data.errors));
  }
}

export function* watchLoginAttempt() {
  yield takeLatest(DO_LOGIN_ATTEMPT, loginAttempt);
}

function* logoutAttempt() {
  yield put(loginStatus({}));
  localStorage.removeItem("rtfmJWT");
}

export function* watchLogoutAttempt() {
  yield takeLatest(DO_LOGOUT, logoutAttempt);
}
