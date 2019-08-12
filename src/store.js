import { createStore } from "redux";

let initialState = { username: undefined };

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, username: action.username };
  }
  return state;
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
