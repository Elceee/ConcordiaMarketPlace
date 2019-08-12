import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./Item.jsx";

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
        return (
          <div>
            <Item contents={this.findItemById(itemId)} />
            <div>Count: {this.props.cart[itemId]}</div>
          </div>
        );
      }
    });
    return <div>{items}</div>;
  }
}

let mapStateToProps = state => {
  return { cart: state.cart, items: state.items };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
