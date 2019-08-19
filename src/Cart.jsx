import React, { Component } from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout.jsx";
import CartItem from "./CartItem.jsx";
import Location from "./Location.jsx";
import ShippingInfo from "./ShippingInfo.jsx";
import { Link } from "react-router-dom";
import "./Cart.css";
import locations from "./locations.jsx";

class UnconnectedCart extends Component {
  constructor(props) {
    super();
  }

  componentDidMount = () => {
    let cartTotal = 0;
    let items = Object.keys(this.props.cart).map(itemId => {
      let item = this.findItemById(itemId);
      cartTotal += this.props.cart[itemId] * item.price;
    });
    let shippingIn = this.calculatedShipping() + cartTotal;
    console.log("this should include shipping", shippingIn);
    this.props.dispatch({ type: "addToTotal", total: shippingIn });
  };

  calculatedShipping = location => {
    if (locations[location] === undefined) {
      return 5.95;
    }
    return locations[location];
  };

  findItemById = itemId => {
    let item = this.props.items.filter(item => {
      return item._id === itemId;
    });
    return item[0];
  };

  numberOfItems = () => {
    let numItems = 0;
    let cart = this.props.cart;
    Object.keys(cart).forEach(item => {
      numItems = numItems + cart[item];
    });
    return numItems;
  };

  itemsWording = items => {
    if (items === 1) {
      return "1 Item";
    } else {
      return items + " Items";
    }
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
    ///changing state of total in the store
    return (
      <div className="cartContainer">
        <h3 className="header">Your Shopping Cart</h3>
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

        <div className="card center nomin">
          <div className="offWhite">
            <div>
              <ShippingInfo />
            </div>
            <div className="centerMe">
              <Location />
            </div>
          </div>
          <div className="paymentContainer">
            <div>
              <dt>{this.itemsWording(this.numberOfItems())}</dt>
              <dd>${"" + cartTotal}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>${this.calculatedShipping(this.props.location) + ""}</dd>
            </div>
            <div>
              <dt>Your Total</dt>
              <dd>
                $
                {"" +
                  (this.calculatedShipping(this.props.location) + cartTotal)}
              </dd>
            </div>
          </div>
          <div className="pad">
            <Checkout
              cart={this.props.cart}
              amount={this.props.total}
              currency="CAD"
              bitcoin
            />
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    cart: state.cart,
    items: state.items,
    total: state.total,
    location: state.location
  };
};

let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
