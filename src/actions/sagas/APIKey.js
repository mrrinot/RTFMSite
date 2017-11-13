import { DO_CREATE_API_KEY_ATTEMPT } from "../types";
import { call, takeLatest, put } from "redux-saga/effects";
import { createAPIKey } from "../../api/APIKey";
import { onCreatedAPIKey, loadingApiKey } from "../creators/APIKey";

function* createAPIKeyAttempt({ input }) {
  yield put(loadingApiKey(true));
  try {
    const ret = yield call(createAPIKey);
    yield put(onCreatedAPIKey(ret.data.key));
  } catch (e) {
    yield put(onCreatedAPIKey("", e.response.data.errors));
  }
}

export function* watchAPIKeyCreate() {
  yield takeLatest(DO_CREATE_API_KEY_ATTEMPT, createAPIKeyAttempt);
}
