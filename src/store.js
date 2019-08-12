import { createStore } from "redux";

let initialState = { username: undefined, items: [], cart: {} };

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, username: action.username };
  }

  if (action.type === "updateItems") {
    return { ...state, items: action.items };
  }

  if (action.type === "addToCart") {
    let itemId = action.item._id;
    let cart = { ...state.cart };
    if (cart[itemId] !== undefined) {
      cart[itemId] += 1;
      return { ...state, cart: cart };
    }
    cart[itemId] = 1;
    return { ...state, cart: cart };
  }

  if (action.type === "update-quantity") {
    let cart = { ...state.cart };
    cart[action.id] = action.quantity;
    return { ...state, cart: cart };
  }

  return state;
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
