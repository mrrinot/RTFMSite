import { DO_INVITE_SEND, DO_INVITE_CONFIRM } from "../types";
import { delay } from "redux-saga";
import { call, takeLatest, put } from "redux-saga/effects";
import { inviteStatus, inviteConfirmStatus } from "../creators/invite";
import { loading } from "../creators/loading";
import { loginAttempt } from "../creators/login";
import history from "../../history";
import { sendInvite, sendInviteConfirmation } from "../../api/invite";

function* inviteAttempt(action) {
  yield put(loading(true));
  try {
    const ret = yield call(sendInvite, action.inviteInfos);
    yield put(inviteStatus(ret));
    history.push("/");
  } catch (e) {
    yield put(inviteStatus(null, e.response.data.errors));
  }
  yield put(loading(false));
}

export function* watchInviteAttempt() {
  yield takeLatest(DO_INVITE_SEND, inviteAttempt);
}

function* inviteConfirmAttempt(action) {
  yield put(loading(true));
  try {
    const ret = yield call(sendInviteConfirmation, action.inviteConfirmationInfos);
    yield put(inviteConfirmStatus(ret));
    localStorage.rtfmUserInfos = JSON.stringify(ret.data);
  } catch (e) {
    yield put(inviteConfirmStatus(null, e.response.data.errors));
  }
  yield put(loading(false));
  yield delay(1500);
  yield put(
    loginAttempt({
      email: action.inviteConfirmationInfos.email,
      password: action.inviteConfirmationInfos.password,
    }),
  );
}

export function* watchInviteConfirmAttempt() {
  yield takeLatest(DO_INVITE_CONFIRM, inviteConfirmAttempt);
}
