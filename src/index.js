import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducer from "./reducers";
import jwt from "jsonwebtoken";
import { setCurrentUser } from "./actions";

const middleware = [thunk];
const store = createStore(allReducer, applyMiddleware(...middleware));

if(localStorage.token)store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
