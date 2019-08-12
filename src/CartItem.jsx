import React, { Component } from "react";
import Item from "./Item.jsx";
import { connect } from "react-redux";
import Cart from "./Cart.jsx";

class UnconnectedCartItem extends Component {
  constructor(props) {
    super(props);
    itemId = this.props.contents._id;
  }

  minus = () => {
    this.props.dispatch({
      type: "update-quantity",
      id: this.itemId,
      quantity: this.props.cart[this.itemId] - 1
    });
  };

  plus = () => {
    this.props.dispatch({
      type: "update-quantity",
      id: this.itemId,
      quantity: this.props.cart[this.itemId] + 1
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
            value={this.props.cart[this.itemId]}
            onChange={this.changeQuantityHandler}
          />
          <input type="button" value="-" onClick={this.minus} />
          <input type="button" value="+" onClick={this.plus} />
        </div>

        <div>Count: {this.props.cart[itemId]}</div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let CartItem = connect(mapStateToProps)(UnconnectedCartItem);

export default CartItem;
