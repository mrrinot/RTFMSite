import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "./css/dark.css";
import "./css/bootstrap_fix.css";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import * as actionCreators from "./actions/creators";
import { loginStatus } from "./actions/creators/auth";
import { createAPIKeyAttempt } from "./actions/creators/APIKey";
import App from "./App";
import rootSaga from "./saga";
import history from "./history";
import axios from "axios";
import { Message, Icon } from "semantic-ui-react";
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
import { isLoggedIn } from "./api/auth";

const composeEnhancers = composeWithDevTools({ actionCreators });
const sagaMiddleware = createSagaMiddleware();
const routerMiddlewares = routerMiddleware(history);
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddlewares)),
);
sagaMiddleware.run(rootSaga);

function renderAuthLoading() {
  return (
    <Message color="green" icon>
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header>Checking auth</Message.Header>
        Please wait
      </Message.Content>
    </Message>
  );
}

function renderDOM(loaded) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>{loaded ? renderAuthLoading() : <App />}</ConnectedRouter>
    </Provider>,
    document.getElementById("root"),
  );
}

if (localStorage.rtfmUserInfos) {
  const userInfos = JSON.parse(localStorage.rtfmUserInfos);
  renderDOM(true);
  isLoggedIn(userInfos.email)
    .then(ret => {
      store.dispatch(loginStatus(ret.data));
      store.dispatch(createAPIKeyAttempt(ret.data.APIKey));
      renderDOM(false);
    })
    .catch(e => {
      store.dispatch(loginStatus({}));
      store.dispatch(createAPIKeyAttempt({}));
      localStorage.removeItem("rtfmUserInfos");
      renderDOM(false);
    });
} else {
  renderDOM(false);
}
