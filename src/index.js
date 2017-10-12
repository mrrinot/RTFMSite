import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import decode from "jwt-decode";
import rootReducer from "./reducers/rootReducer";
import * as actionCreators from "./actions/creators";
import { loginStatus } from "./actions/creators/login";
import App from "./App";
import rootSaga from "./saga";

const composeEnhancers = composeWithDevTools({ actionCreators });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

if (localStorage.rtfmJWT) {
  const payload = decode(localStorage.rtfmJWT);
  const userInfos = {
    token: localStorage.rtfmJWT,
    email: payload.email,
    adminLevel: payload.adminLevel,
    pseudo: payload.pseudo,
  };
  store.dispatch(loginStatus(userInfos));
}
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
