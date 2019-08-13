import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem.jsx";

class UnconnectedCart extends Component {
  constructor(props) {
    super();
  }

  findItemById = itemId => {
    let item = this.props.items.filter(item => {
      return item._id === itemId;
    });
    return item[0];
  };

  purchaseCart = () => {
    let cart = { ...this.props.cart };
    let data = new FormData();
    data.append("cart", JSON.stringify(cart));
    fetch("/purchaseCart", { method: "post", body: data });
    this.props.dispatch({ type: "purchaseCart" });
  };
  render() {
    let emptyCart = Object.keys(this.props.cart).length === 0;

    let items = Object.keys(this.props.cart).map(itemId => {
      {
        let item = this.findItemById(itemId);
        return <CartItem key={itemId} contents={item} />;
      }
    });

    if (emptyCart) {
      return (
        <div>
          <h4>Your cart is empty :(</h4>
        </div>
      );
    }
    return (
      <div>
        <h3>Cart</h3>
        {items}
        <button onClick={this.purchaseCart}>Purchase</button>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart, items: state.items };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
