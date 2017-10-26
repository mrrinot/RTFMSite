import { DO_CREATE_API_KEY_ATTEMPT } from "../types";
import { loading } from "../creators/loading";
import { call, takeLatest, put } from "redux-saga/effects";
import { createAPIKey } from "../../api/APIKey";
import { onCreatedAPIKey } from "../creators/APIKey";

function* createAPIKeyAttempt({ input }) {
  yield put(loading(true));
  try {
    const ret = yield call(createAPIKey);
    yield put(onCreatedAPIKey(ret.data.key));
  } catch (e) {
    yield put(onCreatedAPIKey("", e.response.data.errors));
  }
  yield put(loading(false));
}

export function* watchAPIKeyCreate() {
  yield takeLatest(DO_CREATE_API_KEY_ATTEMPT, createAPIKeyAttempt);
}
