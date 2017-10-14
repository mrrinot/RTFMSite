import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import * as actionCreators from "./actions/creators";
import { loginStatus } from "./actions/creators/login";
import App from "./App";
import rootSaga from "./saga";
import history from "./history";

const composeEnhancers = composeWithDevTools({ actionCreators });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

if (localStorage.rtfmUserInfos) {
  store.dispatch(loginStatus(JSON.parse(localStorage.rtfmUserInfos)));
}

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root"),
);
