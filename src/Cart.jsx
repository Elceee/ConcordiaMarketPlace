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

  render() {
    let items = Object.keys(this.props.cart).map(itemId => {
      {
        let item = this.findItemById(itemId);
        return <CartItem key={itemId} contents={item} />;
      }
    });
    return (
      <div>
        <h3>Cart</h3>
        {items}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { cart: state.cart, items: state.items };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
