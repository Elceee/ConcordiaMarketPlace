import React, { Component } from "react";
import { connect } from "react-redux";
import CartAdder from "./CartAdder.jsx";
import { Link } from "react-router-dom";
import "./CartItem.css";

class UnconnectCartItem extends Component {
  constructor(props) {
    super(props);
  }

  removeFromCart = () => {
    let itemId = this.props.item._id;
    let data = new FormData();
    data.append("itemId", itemId);
    fetch("/removeFromCart", { method: "post", body: data });
    this.props.dispatch({ type: "removeFromCart", id: itemId });
  };
  render() {
    let amountInCart = parseInt(
      this.props.cart[this.props.item._id]
    ).toString();

    if (isNaN(amountInCart)) {
      amountInCart = "";
    }

    let itemsPrice =
      (this.props.item.price / 100).toFixed(2) * parseInt(amountInCart);
    return (
      <div className="cartItemContainer">
        <div className="cartItem">
          <img src={this.props.item.imagePath} height="100 px" />
          <div className="cartItemDesc">
            <div>{this.props.item.name}</div>
            <div>
              <Link to={"/itemdetails/" + this.props.item._id}>
                Item Details
              </Link>
            </div>
            <div className="sellerDiv">
              <Link to={"/sellerpage/" + this.props.item.seller}>
                Seller: {this.props.item.seller}
              </Link>
            </div>
            <div>Price: ${(this.props.item.price / 100).toFixed(2)}</div>
          </div>
        </div>
        <div className="cartAdder">
          <CartAdder contents={this.props.item} />
          <div style={{ textAlign: "center", margin: "5px" }}>
            <button onClick={this.removeFromCart}>Remove From Cart</button>
          </div>
        </div>
        <div className="itemPrice">${itemsPrice.toFixed(2)}</div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart };
};

let CartItem = connect(mapStateToProps)(UnconnectCartItem);

export default CartItem;
