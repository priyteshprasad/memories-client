import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux"; //keep take of store and its acces the state from anywhere in the project
import { createStore, configureStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

import App from "./App";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  //app is using redux and we can use its all the cababilities
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// ReactDOM.render(<App/>)
