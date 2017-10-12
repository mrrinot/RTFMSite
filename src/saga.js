import watchers from "./actions/sagas/";
import { all } from "redux-saga/effects";

console.log(watchers);
export default function* rootSaga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
