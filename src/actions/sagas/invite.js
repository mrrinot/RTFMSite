import { DO_INVITE_SEND, DO_INVITE_CONFIRM } from "../types";
import { delay } from "redux-saga";
import { call, all, takeLatest, put } from "redux-saga/effects";
import { setInviteLoading, inviteStatus, inviteConfirmStatus } from "../creators/invite";
import { loginStatus } from "../creators/login";
import decode from "jwt-decode";
import { sendInvite, sendInviteConfirmation } from "../../api/invite";

function* inviteAttempt(action) {
  yield put(setInviteLoading(true));
  try {
    const ret = yield call(sendInvite, action.inviteInfos);
    yield put(inviteStatus(ret));
  } catch (e) {
    yield put(inviteStatus(null, e.response.data.errors));
  }
}

export function* watchInviteAttempt() {
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

export function* watchInviteConfirmAttempt() {
  yield takeLatest(DO_INVITE_CONFIRM, inviteConfirmAttempt);
}
