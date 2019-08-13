import React, { Component } from "react";
import Item from "./Item.jsx";
import { connect } from "react-redux";

class UnconnectedCartItem extends Component {
  constructor(props) {
    super(props);
    this.itemId = this.props.contents._id;
    this.amountInCart = this.props.cart[this.itemId];
  }

  minus = () => {
    this.props.dispatch({
      type: "update-quantity",
      id: this.itemId,
      quantity: this.CartamountInCart - 1
    });
  };

  plus = () => {
    this.props.dispatch({
      type: "update-quantity",
      id: this.itemId,
      quantity: this.amountInCart + 1
    });
  };

  changeQuantityHandler = event => {
    this.props.dispatch({
      type: "update-quantity",
      id: this.itemId,
      quantity: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Item contents={this.props.contents} inCart="true" />
        <div>
          <input
            type="text"
            size="25"
            value={this.amountInCart}
            onChange={this.changeQuantityHandler}
          />
          <input type="button" value="-" onClick={this.minus} />
          <input type="button" value="+" onClick={this.plus} />
        </div>

        <div>Count: {this.amountInCart}</div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let CartItem = connect(mapStateToProps)(UnconnectedCartItem);

export default CartItem;
