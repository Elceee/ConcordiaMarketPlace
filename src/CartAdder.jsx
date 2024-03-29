import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedCartAdder extends Component {
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
    let amountInStock = parseInt(this.props.contents.stock);
    if (amountInCart + 1 <= amountInStock) {
      let newQuanity = amountInCart + 1;
      this.sendQuantityToBackend(newQuanity);
    }
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
    let amountInStock = this.props.contents.stock;
    console.log("amountInStock", amountInStock);
    if (event.target.value > amountInStock) {
      inputNumberString = amountInStock;
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

  render() {
    let amountInCart = parseInt(
      this.props.cart[this.props.contents._id]
    ).toString();

    if (isNaN(amountInCart)) {
      amountInCart = "";
    }
    return (
      <div>
        <input
          type="text"
          size="15"
          value={amountInCart}
          onChange={this.changeQuantityHandler}
          onBlur={this.checkForNull}
        />
        <input type="button" value="-" onClick={this.subtractQuanityFromCart} />
        <input type="button" value="+" onClick={this.addQuanityToCart} />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart, items: state.items };
};

let CartAdder = connect(mapStateToProps)(UnconnectedCartAdder);

export default CartAdder;
