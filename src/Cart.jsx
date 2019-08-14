import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";

class UnconnectedCart extends Component {
  constructor(props) {
    super();
    this.state = { total: 0 };
  }

  findItemById = itemId => {
    let item = this.props.items.filter(item => {
      return item._id === itemId;
    });
    return item[0];
  };

  addToTotal = price => {
    this.setState({ total: this.state.total + price });
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

    if (emptyCart) {
      return (
        <div>
          <h4>Your cart is empty :/</h4>
        </div>
      );
    }
    let cartTotal = 0;
    let items = Object.keys(this.props.cart).map(itemId => {
      let item = this.findItemById(itemId);
      cartTotal += this.props.cart[itemId] * item.price;
      return <Item key={itemId} contents={item} inCart="true" />;
    });
    return (
      <div>
        <h3>Cart</h3>
        {items}
        <button onClick={this.purchaseCart}>Purchase Cart</button>
        <div>Cart Total: {cartTotal}</div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart, items: state.items, cartTotal: state.cartTotal };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
