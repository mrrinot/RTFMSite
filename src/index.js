import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import * as actionCreators from "./actions/creator";
import App from "./App";

const composeEnhancers = composeWithDevTools({ actionCreators });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root"),
);
