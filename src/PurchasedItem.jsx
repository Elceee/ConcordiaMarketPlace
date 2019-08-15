import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectPurchasedItem extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="cartItemContainer">
        <div className="cartItem">
          <img src={this.props.item.imagePath} height="100 px" />
          <div className="cartItemDesc">
            <div>{this.props.item.name}</div>
            <div>Price: ${this.props.item.price}</div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStatesToProps = state => {
  return { cart: state.cart };
};

let PurchasedItem = connect(mapStatesToProps)(UnconnectPurchasedItem);

export default PurchasedItem;
