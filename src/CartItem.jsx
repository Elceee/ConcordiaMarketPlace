import React, { Component } from "react";
import Item from "./Item.jsx";
import { connect } from "react-redux";

class UnconnectedCartItem extends Component {
  constructor(props) {
    super(props);
  }

  minus = () => {
    let amountInCart = this.props.cart[this.props.contents._id];
    let itemId = this.props.contents._id;
    this.props.dispatch({
      type: "update-quantity",
      id: itemId,
      quantity: amountInCart - 1
    });
  };

  plus = () => {
    let amountInCart = this.props.cart[this.props.contents._id];
    let itemId = this.props.contents._id;
    this.props.dispatch({
      type: "update-quantity",
      id: itemId,
      quantity: amountInCart + 1
    });
  };

  changeQuantityHandler = event => {
    let itemId = this.props.contents._id;
    this.props.dispatch({
      type: "update-quantity",
      id: itemId,
      quantity: event.target.value
    });
  };

  render() {
    let amountInCart = this.props.cart[this.props.contents._id];
    return (
      <div>
        <Item contents={this.props.contents} inCart="true" />
        <div>
          <input
            type="text"
            size="25"
            value={amountInCart}
            onChange={this.changeQuantityHandler}
          />
          <input type="button" value="-" onClick={this.minus} />
          <input type="button" value="+" onClick={this.plus} />
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
