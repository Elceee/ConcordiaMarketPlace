import React, { Component } from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout.jsx";
import CartItem from "./CartItem.jsx";
import { Link } from "react-router-dom";
import "./Cart.css";

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
        <div className="cartContainer emptyCart">
          <h3>Your Shopping Cart</h3>
          <div className="emptyMsg">Your cart is empty</div>
          <div className="continueDiv">
            <Link to={"/"}>Continue Shopping</Link>
          </div>
        </div>
      );
    }
    let cartTotal = 0;
    let items = Object.keys(this.props.cart).map(itemId => {
      let item = this.findItemById(itemId);
      cartTotal += this.props.cart[itemId] * item.price;
      return <CartItem key={itemId} item={item} />;
    });
    return (
      <div className="cartContainer">
        <h3>Your Shopping Cart</h3>
        <div>
          <div className="cartTitle">
            <div className="itemTitle">Item</div>
            <div className="quantTitle">Quantity</div>
            <div className="totalTitle">Total</div>
          </div>
          {items}
          <div className="continueDiv">
            <Link to={"/"}>Continue Shopping</Link>
          </div>
        </div>
        <div className="card center">
          <button onClick={this.purchaseCart}>Purchase Cart</button>
          <div className="pad">
            <Checkout amount={cartTotal} currency="CAD" bitcoin />
          </div>
          <div className="pad">Cart Total: {cartTotal}</div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart, items: state.items, cartTotal: state.cartTotal };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
