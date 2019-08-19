import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./PurchasedItem.css";

class UnconnectPurchasedItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let amountPurchased = this.props.count;
    let itemsPrice = this.props.item.price * amountPurchased;
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
        <div className="amountPurchased">{amountPurchased}</div>
        <div className="itemsTotal">${(itemsPrice / 100).toFixed(2)}</div>
      </div>
    );
  }
}

let mapStatesToProps = state => {
  return { cart: state.cart };
};

let PurchasedItem = connect(mapStatesToProps)(UnconnectPurchasedItem);

export default PurchasedItem;
