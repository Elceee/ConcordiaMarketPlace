import { createStore } from "redux";

let initialState = {
  username: undefined,
  items: [],
  cart: {},
  query: "",
  total: 0,
  page: 0,
  location: undefined,
  landingPageOpen: false
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
    return { ...state, cart: cart };
  }

  if (action.type === "removeFromCart") {
    let cart = { ...state.cart };

    let itemId = action.id;
    delete cart[itemId];

    return { ...state, cart: cart };
  }
  if (action.type === "addToTotal") {
    let newTotal = action.total;
    return { ...state, total: newTotal };
  }

  if (action.type === "purchaseCart") {
    return { ...state, cart: {} };
  }

  if (action.type === "logOut") {
    return { ...state, cart: {}, query: "", username: undefined };
  }

  if (action.type === "pageChange") {
    return { ...state, page: action.page, query: "" };
  }
  if (action.type === "location") {
    return { ...state, location: action.location };
  }

  if (action.type === "closeModal") {
    return { ...state, landingPageOpen: false };
  }

  if (action.type === "openModal") {
    return { ...state, landingPageOpen: true };
  }

  return state;
};

let store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
