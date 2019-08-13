import React, { Component } from "react";
import Item from "./Item.jsx";
import { connect } from "react-redux";

class UnconnectedCartItem extends Component {
  constructor(props) {
    super(props);
  }

  subtractQuanityFromCart = () => {
    let amountInCart = this.props.cart[this.props.contents._id];
    if (amountInCart === 1) {
      return;
    }
    let newQuanity = amountInCart - 1;
    this.sendQuantityToBackend(newQuanity);
  };

  addQuanityToCart = () => {
    let amountInCart = parseInt(this.props.cart[this.props.contents._id]);

    let newQuanity = amountInCart + 1;
    this.sendQuantityToBackend(newQuanity);
  };

  changeQuantityHandler = event => {
    let newQuanity = 1;
    if (isNaN(event.target.value)) {
      this.sendQuantityToBackend(newQuanity);
      return;
    }
    if (event.target.value < 0) {
      return;
    }

    let inputNumberString = event.target.value;
    if (event.target.value === "0") {
      inputNumberString = 1;
    }
    newQuanity = parseInt(inputNumberString);

    this.sendQuantityToBackend(newQuanity);
  };

  sendQuantityToBackend = quantity => {
    let itemId = this.props.contents._id;
    let data = new FormData();
    data.append("itemId", itemId);
    data.append("quantity", quantity);
    fetch("/add-to-cart", { method: "POST", body: data });
    this.props.dispatch({
      type: "update-quantity",
      id: itemId,
      quantity: quantity
    });
  };

  checkForNull = event => {
    let newQuanity = event.target.value;
    if (newQuanity === "") {
      newQuanity = 1;
    }
    this.sendQuantityToBackend(newQuanity);
  };

  removeFromCart = () => {
    let itemId = this.props.contents._id;
    let data = new FormData();
    data.append("itemId", itemId);
    fetch("/removeFromCart", { method: "post", body: data });
    this.props.dispatch({ type: "removeFromCart", id: itemId });
  };

  render() {
    let amountInCart = parseInt(
      this.props.cart[this.props.contents._id]
    ).toString();

    if (isNaN(amountInCart)) {
      amountInCart = "";
    }

    return (
      <div>
        <Item contents={this.props.contents} inCart="true" />
        <div>
          <input
            type="text"
            size="25"
            value={amountInCart}
            onChange={this.changeQuantityHandler}
            onBlur={this.checkForNull}
          />
          <input
            type="button"
            value="-"
            onClick={this.subtractQuanityFromCart}
          />
          <input type="button" value="+" onClick={this.addQuanityToCart} />
          <button onClick={this.removeFromCart}>Remove From Cart</button>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let CartItem = connect(mapStateToProps)(UnconnectedCartItem);

export default CartItem;
