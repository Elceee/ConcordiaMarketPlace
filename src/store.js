import { createStore } from "redux";

let initialState = {
  username: undefined,
  items: [],
  cart: {},
  query: "",
  cartTotal: 0
};

let reducer = (state, action) => {
  if (action.type === "login-success") {
    return { ...state, username: action.username };
  }

  if (action.type === "updateItems") {
    return { ...state, items: action.items };
  }
  if (action.type === "searchTerms") {
    return { ...state, query: action.query };
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
    let newQuantity = action.quantity;
    let cart = { ...state.cart };
    cart[action.id] = newQuantity;
    return { ...state, cart: cart, cartTotal: state.cartTotal + action.price };
  }

  if (action.type === "removeFromCart") {
    let cart = { ...state.cart };

    let itemId = action.id;
    delete cart[itemId];

    return { ...state, cart: cart };
  }

  if (action.type === "purchaseCart") {
    return { ...state, cart: {}, cartTotal: 0 };
  }

  if (action.type === "logOut") {
    return initialState;
  }

  return state;
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
