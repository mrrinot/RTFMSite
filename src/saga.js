import {
  DO_LOGIN_ATTEMPT,
  DO_FETCH_ITEMS,
  DO_LOGOUT,
  DO_INVITE_SEND,
  DO_INVITE_CONFIRM,
} from "./actions/types";
import { delay } from "redux-saga";
import { call, all, takeLatest, put } from "redux-saga/effects";
import {
  loginStatus,
  setLoginLoading,
  onFetchedItems,
  setInviteLoading,
  inviteStatus,
  inviteConfirmStatus,
} from "./actions/creators";
import { getItems } from "./api/items";
import decode from "jwt-decode";
import { login } from "./api/login";
import { sendInvite, sendInviteConfirmation } from "./api/invite";

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

function* watchLoginAttempt() {
  yield takeLatest(DO_LOGIN_ATTEMPT, loginAttempt);
}

function* logoutAttempt() {
  yield put(loginStatus({}));
  localStorage.removeItem("rtfmJWT");
}

function* watchLogoutAttempt() {
  yield takeLatest(DO_LOGOUT, logoutAttempt);
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

function* inviteAttempt(action) {
  yield put(setInviteLoading(true));
  try {
    const ret = yield call(sendInvite, action.inviteInfos);
    yield put(inviteStatus(ret));
  } catch (e) {
    yield put(inviteStatus(null, e.response.data.errors));
  }
}

function* watchInviteAttempt() {
  yield takeLatest(DO_INVITE_SEND, inviteAttempt);
}

function* inviteConfirmAttempt(action) {
  yield put(setInviteLoading(true));
  try {
    const ret = yield call(sendInviteConfirmation, action.inviteConfirmationInfos);
    yield put(inviteConfirmStatus(ret));
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
    yield put(inviteConfirmStatus(null, e.response.data.errors));
  }
}

function* watchInviteConfirmAttempt() {
  yield takeLatest(DO_INVITE_CONFIRM, inviteConfirmAttempt);
}

export default function* rootSaga() {
  yield all([
    watchLoginAttempt(),
    watchItemsFetch(),
    watchLogoutAttempt(),
    watchInviteAttempt(),
    watchInviteConfirmAttempt(),
  ]);
}
