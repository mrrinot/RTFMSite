import { DO_FETCH_RECIPES } from "../types";
import { call, takeLatest, put } from "redux-saga/effects";
import { getRecipes } from "../../api/recipes";
import { onFetchedRecipes, loadingRecipes } from "../creators/recipes";

function* fetchRecipeAttempt({ input }) {
  yield put(loadingRecipes(true));
  try {
    const ret = yield call(getRecipes, input);
    yield put(onFetchedRecipes(ret.data));
  } catch (e) {
    yield put(onFetchedRecipes({}, e.response.data.errors));
  }
}

export function* watchRecipeAttempt() {
  yield takeLatest(DO_FETCH_RECIPES, fetchRecipeAttempt);
}
