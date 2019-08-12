import { createStore } from "redux";

let initialState = { username: undefined, items: [], cart: [] };

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, username: action.username };
  }

  if (action.type === "updateItems") {
    return { ...state, items: action.items };
  }

  if (action.type === "addToCart") {
    let newCart = state.cart.slice();
    let newItem = action.item;
    newCart.push(newItem);
    return { ...state, cart: newCart };
  }
  return state;
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
